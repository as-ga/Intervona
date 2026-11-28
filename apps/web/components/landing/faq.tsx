import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

const ITEMS = [
  {
    q: "Which languages are supported?",
    a: "English and Hinglish are supported. Hinglish lets you answer naturally with a Hindi-English mix without forcing formal Hindi phrasing.",
  },
  {
    q: "How is each interview personalized?",
    a: "Your CV, job description and selected interviewer style shape the question plan. Follow-up questions adapt to what you say during the session.",
  },
  {
    q: "What are the avatars?",
    a: "Original, IP-safe interviewer personas — Arjun and Ananya — that react to the conversation. They stay smooth and consistent across devices.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-line/70 py-[104px]">
      <Container>
        <Reveal className="mb-8 max-w-[680px]">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="serif mt-3.5 text-[38px]">Good questions.</h2>
        </Reveal>
        {ITEMS.map((item) => (
          <details key={item.q} className="group border-b border-line py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-[17px] font-medium [&::-webkit-details-marker]:hidden">
              {item.q}
              <Plus
                size={18}
                className="text-faint transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="mt-3 max-w-[760px] text-[15px] text-ink-soft">
              {item.a}
            </p>
          </details>
        ))}
      </Container>
    </section>
  );
}
