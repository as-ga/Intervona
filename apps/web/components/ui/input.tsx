import * as React from "react";
import { cn } from "@/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-xl border border-line bg-panel/80 px-4 py-3 shadow-sm",
          "text-[14.5px] text-ink placeholder:text-faint",
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
Input.displayName = "Input";
