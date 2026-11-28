import { Container } from "@/components/ui/container";
import { BrandMark } from "@/components/ui/brand-mark";

type FooterLink = { href: string; label: string; external?: boolean };

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="mb-3.5 font-mono text-[12px] uppercase tracking-[0.08em] text-faint">
        {title}
      </h4>
      {links.map((link) =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="mb-2.5 block text-sm text-ink-soft hover:text-ink"
          >
            {link.label}
          </a>
        ) : (
          <a
            key={link.label}
            href={link.href}
            className="mb-2.5 block text-sm text-ink-soft hover:text-ink"
          >
            {link.label}
          </a>
        ),
      )}
    </div>
  );
}

const PRODUCT_LINKS: FooterLink[] = [
  { href: "#how", label: "How it works" },
  { href: "#product", label: "Features" },
  { href: "#faq", label: "FAQ" },
];

const PRACTICE_LINKS: FooterLink[] = [
  { href: "/setup", label: "New interview" },
  { href: "/prep", label: "Prep coach" },
];

export function Footer() {
  return (
    <footer className="mt-[30px] border-t border-line pt-[54px] pb-10">
      <Container>
        <div className="mb-9 grid grid-cols-2 gap-[30px] md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-[9px]">
              <BrandMark size={22} />
              <span className="text-[17px] font-semibold tracking-[-0.01em]">
                Intervona
              </span>
            </div>
            <p className="max-w-[280px] text-sm text-muted">
              Practice the conversation before it matters.
            </p>
          </div>
          <FooterCol title="Product" links={PRODUCT_LINKS} />
          <FooterCol title="Practice" links={PRACTICE_LINKS} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line pt-[22px] text-[13px] text-faint">
          <span>© 2026 Intervona</span>
          <span className="font-mono">Practice with intention</span>
        </div>
      </Container>
    </footer>
  );
}
