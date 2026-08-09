import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border border-input bg-foreground/[0.02] px-4 py-2 text-sm",
        "placeholder:text-muted-foreground/70 transition-colors duration-200",
        "hover:border-foreground/20 focus:border-primary/60 focus:bg-foreground/[0.04]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-red-500/60",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
