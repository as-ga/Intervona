import * as React from "react";
import { cn } from "@/lib/cn";

export type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement>;

export function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-semibold uppercase tracking-[0.17em] text-accent",
        className,
      )}
      {...props}
    />
  );
}
