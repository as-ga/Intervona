import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="pb-[84px]">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-ink p-[54px] text-center text-white shadow-[0_32px_80px_-36px_rgba(24,22,42,0.8)]">
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-accent/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#e15f85]/30 blur-3xl" />
            <div className="relative">
              <Eyebrow>Ready when you are</Eyebrow>
              <h2 className="serif mt-3 mb-3.5 text-[38px] text-white">
                Your next interview starts here.
              </h2>
              <p className="mb-[26px] text-[17px] text-white/70">
                Upload a CV, paste a job post, and talk it through — in minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/setup"
                  className={buttonClasses({
                    className:
                      "bg-white text-ink hover:bg-accent hover:text-white",
                  })}
                >
                  Build my interview
                </Link>
                <a
                  href="#how"
                  className={buttonClasses({
                    variant: "out",
                    className: "border-white/20 bg-white/10 text-white hover:bg-white hover:text-ink",
                  })}
                >
                  See the process
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
