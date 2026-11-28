import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "ink" | "out" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full " +
  "transition-all duration-200 cursor-pointer select-none active:translate-y-px " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-white border border-transparent shadow-[0_10px_30px_-14px_rgba(24,22,42,0.8)] hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_14px_34px_-14px_rgba(109,74,255,0.75)]",
  out: "bg-panel/70 text-ink border border-line shadow-sm hover:-translate-y-0.5 hover:border-accent/40 hover:bg-panel",
  ghost:
    "bg-transparent text-ink-soft border border-transparent hover:text-accent hover:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  sm: "text-[13px] px-3 py-1.5",
  md: "text-[14.5px] px-[18px] py-[11px]",
  lg: "text-[15px] px-6 py-3",
};

export function buttonClasses({
  variant = "ink",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "ink", size = "md", type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses({ variant, size, className })}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
