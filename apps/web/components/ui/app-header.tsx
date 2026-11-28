import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { cn } from "@/lib/cn";

export function AppHeader({
  label,
  action,
  className,
}: {
  label?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-line/70 pb-5",
        className,
      )}
    >
      <Link href="/" className="flex items-center gap-3 text-ink no-underline">
        <BrandMark size={34} />
        <span>
          <span className="block text-[17px] font-bold tracking-[-0.03em]">
            Intervona
          </span>
          {label ? (
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-faint">
              {label}
            </span>
          ) : null}
        </span>
      </Link>
      {action}
    </header>
  );
}
