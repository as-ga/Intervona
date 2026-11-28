"use client";

import { useEffect, useRef, useState } from "react";

const BASE =
  "At a fintech startup we sharded the ledger by region and added idempotency keys";
const PHRASES = [
  BASE,
  `${BASE} — then backfilled idempotently`,
  `${BASE} and cut p99 from 800ms to 120ms`,
];

export function HeroMock() {
  const [said, setSaid] = useState(BASE);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let pi = 0;
    let ci = BASE.length;
    let dir = 1;
    const tick = () => {
      const full = PHRASES[pi];
      if (!full) return;
      setSaid(full.slice(0, ci));
      ci += dir;
      if (ci > full.length) {
        dir = -1;
        timer.current = setTimeout(tick, 1600);
        return;
      }
      if (ci < BASE.length) {
        dir = 1;
        pi = (pi + 1) % PHRASES.length;
      }
      timer.current = setTimeout(tick, dir > 0 ? 42 : 16);
    };
    timer.current = setTimeout(tick, 1200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="surface-glass overflow-hidden rounded-[26px] border border-white/80 shadow-[0_34px_90px_-42px_rgba(57,42,114,0.6)]"
    >
      <div className="flex items-center gap-2 border-b border-line-2 bg-white/50 px-3.5 py-[11px]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff7794]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffc65c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5ed6aa]" />
        <span className="ml-2 rounded-full border border-line-2 bg-white/70 px-[10px] py-[3px] font-mono text-[11.5px] text-faint">
          intervona.local/session/8f2a
        </span>
      </div>
      <div className="grid grid-cols-[150px_1fr]">
        <div className="flex flex-col gap-3 border-r border-line-2 p-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-[linear-gradient(160deg,#23232A,#3C3A4D)]">
            <div className="absolute inset-0 grid place-items-center font-serif text-3xl text-[#D9D6E8]">
              A
            </div>
          </div>
          <div className="flex items-center gap-[7px] font-mono text-[11.5px] text-muted">
            <span className="anim-rec h-[7px] w-[7px] rounded-full bg-[#DC2626]" />{" "}
            04:12
          </div>
          <div className="self-start rounded-md border border-line px-2 py-[3px] font-mono text-[11px] text-ink-soft">
            EN · Recruiter
          </div>
          <div className="self-start rounded-md border border-line px-2 py-[3px] font-mono text-[11px] text-ink-soft">
            Senior Backend
          </div>
        </div>
        <div className="flex min-h-[268px] flex-col gap-[13px] px-[18px] py-4">
          <div className="flex gap-2.5">
            <div className="w-[74px] flex-shrink-0 pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-faint">
              Interviewer
            </div>
            <div className="text-[13.5px] font-[450] leading-[1.5] text-ink">
              Walk me through a time you scaled a system under heavy load.
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="w-[74px] flex-shrink-0 pt-0.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-faint">
              You
            </div>
            <div className="text-[13.5px] leading-[1.5] text-ink-soft">
              {said}
              <span className="anim-cursor ml-px inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent" />
            </div>
          </div>
          <div className="mt-auto flex flex-wrap gap-[18px] border-t border-line-2 pt-3">
            {[
              ["Communication", "8.5"],
              ["System design", "7.0"],
              ["Clarity", "9.0"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-[3px]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-faint">
                  {k}
                </span>
                <span className="font-serif text-[19px] text-ink">
                  {v}
                  <small className="text-xs text-faint">/10</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
