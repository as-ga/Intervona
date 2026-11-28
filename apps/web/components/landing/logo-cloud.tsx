import { Container } from "@/components/ui/container";

const SIGNALS = [
  ["01", "Role-aware questions"],
  ["02", "Real voice practice"],
  ["03", "Competency scoring"],
  ["04", "Focused improvement plan"],
];

export function LogoCloud() {
  return (
    <div className="border-b border-line py-[34px]">
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNALS.map(([number, label]) => (
            <div key={number} className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/45 px-4 py-3">
              <span className="font-mono text-xs text-accent">{number}</span>
              <span className="text-sm font-semibold text-ink-soft">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
