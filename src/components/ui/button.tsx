"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
// In a real project we'd use radix-ui/slot but here let's stick to standard buttons to reduce dependencies

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent-primary)] text-[var(--text-on-accent)] hover:bg-[var(--accent-primary-dim)] shadow-[var(--shadow-glow)]",
        secondary:
          "bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-primary)]",
        outline:
          "border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary-muted)]",
        ghost: "hover:bg-[var(--bg-elevated)] hover:text-white text-[var(--text-secondary)]",
        link: "text-[var(--accent-primary)] underline-offset-4 hover:underline",
        danger:
          "bg-[var(--accent-red)] text-white hover:bg-[var(--accent-red-dim)] shadow-lg shadow-red-500/20",
        cyber:
          "border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] bg-transparent hover:bg-[var(--accent-primary)] hover:text-[var(--text-on-accent)] shadow-[0_0_10px_rgba(0,255,136,0.3)] hover:shadow-[0_0_20px_rgba(0,255,136,0.6)] font-mono uppercase tracking-wider",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If using Radix we'd use Slot here, but for simplicity:
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
