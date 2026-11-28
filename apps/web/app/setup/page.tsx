import { Sparkles } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { SetupForm } from "@/components/setup/setup-form";
import { AppHeader } from "@/components/ui/app-header";

export const dynamic = "force-dynamic";
export default async function SetupPage() {
  const storageConfigured = true;

  return (
    <main className="mx-auto min-h-screen max-w-[1120px] px-5 py-6 sm:px-8 sm:py-8">
      <AppHeader label="Interview builder" action={<LanguageToggle />} />
      <div className="pb-20 pt-10">
        <div className="mx-auto mb-9 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Personalised practice
          </span>
          <h1 className="serif mt-5 text-4xl leading-[1.03] text-ink sm:text-5xl">
            Build your practice interview.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Add your CV and target role, choose how you want to speak, then check your mic. You can review everything before starting.
          </p>
        </div>
        <section className="rounded-[28px] border border-white/80 bg-white/55 p-5 shadow-[0_32px_80px_-48px_rgba(57,42,114,0.55)] backdrop-blur-xl sm:p-8 lg:p-10">
          <SetupForm r2Configured={storageConfigured} />
        </section>
      </div>
    </main>
  );
}
