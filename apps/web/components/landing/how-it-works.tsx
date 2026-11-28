import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    num: "01 — PREP",
    title: "Drop your CV & the job post",
    body: "We extract your experience, the role's real requirements, and the gaps between them — then research how that company actually interviews.",
  },
  {
    num: "02 — INTERVIEW",
    title: "Talk to your interviewer",
    body: "An adaptive voice interview with follow-ups, interruptions, and behavioral, technical and coding rounds — in the language you choose.",
  },
  {
    num: "03 — IMPROVE",
    title: "Score, then study",
    body: "A per-skill scorecard with model answers, and a coach that teaches your weak areas before you go again.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-[104px]">
      <Container>
        <Reveal className="mb-12 max-w-[680px]">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="serif my-3.5 text-[38px]">
            Prepare, perform, improve.
          </h2>
          <p className="text-[17px] text-ink-soft">
            The heavy thinking happens before the call, so the conversation
            itself stays fast and natural.
          </p>
        </Reveal>
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                className="surface-glass rounded-card border border-white/80 px-7 py-[30px] shadow-[0_22px_60px_-38px_rgba(57,42,114,0.4)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-[22px] flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-[0_10px_25px_-10px_rgba(109,74,255,0.8)]">
                  {index + 1}
                </div>
                <h3 className="mb-[9px] text-[19px] font-semibold">
                  {step.title}
                </h3>
                <p className="text-[14.5px] text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
