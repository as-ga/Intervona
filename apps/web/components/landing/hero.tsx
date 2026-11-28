import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button";
import { HeroMock } from "@/components/landing/hero-mock";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden border-b border-line/70">
      <div className="pointer-events-none absolute left-1/2 top-14 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative flex flex-col items-center gap-14 pb-20 pt-[96px]">
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow>Your private interview studio</Eyebrow>
          <h1 className="serif mt-[20px] mb-[24px] text-[48px] text-ink min-[920px]:text-[76px]">
            Don&apos;t just prepare.
            <br />
            <em className="bg-gradient-to-r from-accent to-[#e15f85] bg-clip-text italic text-transparent">Rehearse the real thing.</em>
          </h1>
          <p className="mx-auto mb-7 max-w-[650px] text-lg text-ink-soft">
            Intervona reads your CV and the job description, researches the
            company, and runs a real voice mock interview — then shows you
            exactly what to fix—in English or natural Hinglish.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/setup" className={buttonClasses()}>
              Build my interview <ArrowRight size={16} />
            </Link>
            <a href="#how" className={buttonClasses({ variant: "out" })}>
              See how it works
            </a>
          </div>
          <div className="mt-[18px] flex flex-wrap justify-center gap-3.5 text-[13px] text-faint">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-ok" /> Tailored to your role
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-ok" /> Voice-first practice
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-ok" /> Actionable feedback
            </span>
          </div>
        </div>

        <Reveal className="w-full max-w-[920px]">
          <HeroMock />
        </Reveal>
      </Container>
    </header>
  );
}
