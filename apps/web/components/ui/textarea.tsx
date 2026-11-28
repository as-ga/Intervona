import * as React from "react";
import { cn } from "@/lib/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 5, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full rounded-xl border border-line bg-panel/80 px-4 py-3 shadow-sm",
          "text-[14.5px] leading-relaxed text-ink placeholder:text-faint resize-y",
          "transition-all focus:border-accent focus:bg-panel focus:outline-none",
          "focus-visible:ring-4 focus-visible:ring-accent/10",
          "disabled:opacity-50 disabled:pointer-events-none",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
