"""PostgreSQL session persistence using SQLAlchemy."""

from __future__ import annotations

from typing import Any, Protocol, runtime_checkable
from uuid import uuid4

from sqlalchemy import JSON, String, Text, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from api.views import SessionView
from core.logging import get_logger
from shared_models import AnswerRecord, InterviewContext, PrepRequest, ScoreCard

log = get_logger(__name__)


class Base(DeclarativeBase):
    pass


class SessionRow(Base):
    __tablename__ = "intervona_sessions"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    status: Mapped[str] = mapped_column(String, default="prep")
    user_id: Mapped[str | None] = mapped_column(String, nullable=True)
    company: Mapped[str | None] = mapped_column(String, nullable=True)
    cv_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    jd_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    language_mode: Mapped[dict[str, Any]] = mapped_column(
        JSON, default=lambda: {"primary": "en", "mixed": False}
    )
    context: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    scorecard: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    transcript: Mapped[list[dict[str, Any]] | None] = mapped_column(JSON, nullable=True)
    coach_transcript: Mapped[list[dict[str, Any]] | None] = mapped_column(JSON, nullable=True)
    answers: Mapped[list[dict[str, Any]]] = mapped_column(JSON, default=list)
    progress: Mapped[list[str]] = mapped_column(JSON, default=list)
    prep_warnings: Mapped[list[str]] = mapped_column(JSON, default=list)


@runtime_checkable
class SessionRepository(Protocol):
    async def create_session(self, req: PrepRequest) -> str: ...
    async def save_context(self, session_id: str, ctx: InterviewContext) -> None: ...
    async def load_context(self, session_id: str) -> InterviewContext | None: ...
    async def update_status(self, session_id: str, status: str) -> None: ...
    async def append_answer(self, session_id: str, a: AnswerRecord) -> None: ...
    async def save_scorecard(self, session_id: str, sc: ScoreCard) -> None: ...
    async def save_transcript(self, session_id: str, turns: list[dict]) -> None: ...
    async def save_coach_transcript(self, session_id: str, turns: list[dict]) -> None: ...
    async def mark_progress(self, session_id: str, step: str) -> None: ...
    async def add_warnings(self, session_id: str, warnings: list[str]) -> None: ...
    async def get_session_view(self, session_id: str) -> SessionView | None: ...


class SQLAlchemyRepository:
    def __init__(self, database_url: str) -> None:
        self._engine = create_async_engine(database_url, pool_pre_ping=True)
        self._sessions = async_sessionmaker(self._engine, expire_on_commit=False)
        self._initialized = False

    async def _ensure_schema(self) -> None:
        if self._initialized:
            return
        async with self._engine.begin() as connection:
            await connection.run_sync(Base.metadata.create_all)
        self._initialized = True

    async def _session(self) -> AsyncSession:
        await self._ensure_schema()
        return self._sessions()

    async def _get_row(self, session: AsyncSession, session_id: str) -> SessionRow:
        row = await session.scalar(select(SessionRow).where(SessionRow.id == session_id))
        if row is None:
            raise KeyError(f"Unknown session_id: {session_id}")
        return row

    async def create_session(self, req: PrepRequest) -> str:
        session_id = f"sess_{uuid4().hex}"
        async with await self._session() as session:
            session.add(
                SessionRow(
                    id=session_id,
                    status="prep",
                    user_id=req.user_id,
                    company=req.company,
                    cv_url=req.cv_url,
                    jd_text=req.jd_text,
                    language_mode=req.language_mode.model_dump(),
                    answers=[],
                    progress=[],
                    prep_warnings=[],
                )
            )
            await session.commit()
        return session_id

    async def save_context(self, session_id: str, ctx: InterviewContext) -> None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            row.context = ctx.model_dump()
            await session.commit()

    async def load_context(self, session_id: str) -> InterviewContext | None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            if not row.context:
                return None
            return InterviewContext.model_validate(row.context)

    async def update_status(self, session_id: str, status: str) -> None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            row.status = status
            await session.commit()

    async def append_answer(self, session_id: str, answer: AnswerRecord) -> None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            row.answers = list(row.answers or []) + [answer.model_dump()]
            if row.context:
                ctx = InterviewContext.model_validate(row.context)
                ctx.answers.append(answer)
                row.context = ctx.model_dump()
            await session.commit()

    async def save_scorecard(self, session_id: str, scorecard: ScoreCard) -> None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            row.scorecard = scorecard.model_dump()
            await session.commit()

    async def save_transcript(self, session_id: str, turns: list[dict]) -> None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            row.transcript = turns
            await session.commit()

    async def save_coach_transcript(self, session_id: str, turns: list[dict]) -> None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            row.coach_transcript = turns
            await session.commit()

    async def mark_progress(self, session_id: str, step: str) -> None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            progress = list(row.progress or [])
            if step not in progress:
                progress.append(step)
            row.progress = progress
            await session.commit()

    async def add_warnings(self, session_id: str, warnings: list[str]) -> None:
        async with await self._session() as session:
            row = await self._get_row(session, session_id)
            current = list(row.prep_warnings or [])
            row.prep_warnings = list(dict.fromkeys(current + warnings))
            await session.commit()

    async def get_session_view(self, session_id: str) -> SessionView | None:
        async with await self._session() as session:
            row = await session.scalar(select(SessionRow).where(SessionRow.id == session_id))
            if row is None:
                return None
            context = InterviewContext.model_validate(row.context) if row.context else None
            scorecard = ScoreCard.model_validate(row.scorecard) if row.scorecard else None
            return SessionView(
                session_id=row.id,
                status=row.status,
                progress=list(row.progress or []),
                prep_warnings=list(row.prep_warnings or []),
                context=context,
                scorecard=scorecard,
            )


def get_repository(settings: Any) -> SessionRepository:
    database_url = getattr(settings, "database_url", None)
    if not database_url:
        raise RuntimeError(
            "DATABASE_URL is required. Set it to an async PostgreSQL URL "
            "(postgresql+asyncpg://...)."
        )
    return SQLAlchemyRepository(database_url)
