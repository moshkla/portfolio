import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-32 w-full resize-y rounded-xl border border-input bg-foreground/[0.02] px-4 py-3 text-sm",
      "placeholder:text-muted-foreground/70 transition-colors duration-200",
      "hover:border-foreground/20 focus:border-primary/60 focus:bg-foreground/[0.04]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-[invalid=true]:border-red-500/60",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
