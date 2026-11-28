import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "accent" | "ok" | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-accent-soft text-accent border-transparent",
  accent: "bg-accent text-white border-transparent",
  ok: "bg-[#e6f5ee] text-ok border-transparent",
  outline: "bg-panel/60 text-ink-soft border-line",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1",
        "text-[11px] font-mono font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
