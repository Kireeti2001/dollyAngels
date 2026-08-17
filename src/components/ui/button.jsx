import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-body font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px] border-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-border shadow-hard-sm hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none",
        secondary: "bg-secondary text-secondary-foreground border-border shadow-hard-sm hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none",
        accent: "bg-accent text-accent-foreground border-border shadow-hard-sm hover:-translate-y-0.5 hover:shadow-hard active:translate-y-0.5 active:shadow-none",
        outline: "bg-card text-foreground border-border hover:bg-secondary",
        ghost: "bg-transparent text-foreground border-transparent hover:bg-muted",
        link: "text-primary border-transparent underline-offset-4 hover:underline min-h-0 min-w-0",
        destructive: "bg-destructive text-destructive-foreground border-border shadow-hard-sm hover:-translate-y-0.5",
      },
      size: {
        default: "h-12 px-6 text-sm",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
