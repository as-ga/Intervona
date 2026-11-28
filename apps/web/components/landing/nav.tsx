import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { MobileMenu } from "@/components/landing/mobile-menu";

export const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#product", label: "Product" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/60 bg-paper/70 backdrop-blur-xl">
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-[9px]">
          <BrandMark size={22} />
          <span className="text-[18px] font-bold tracking-[-0.03em]">
            Intervona
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/70 bg-panel/55 p-1 text-[14px] text-ink-soft shadow-sm min-[861px]:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-1.5 transition-colors hover:bg-white hover:text-accent">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3.5">
          <Link href="/setup" className={buttonClasses()}>
            Build my interview
          </Link>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </Container>
    </nav>
  );
}
