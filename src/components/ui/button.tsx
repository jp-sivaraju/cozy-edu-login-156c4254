
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        tricolor: "bg-gradient-to-r from-[#FF9933] to-[#FF9933]/90 text-white border border-[#138808]/20 shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-[#FF9933]/95 hover:to-[#FF9933] transition-all duration-200",
        saffron: "bg-gradient-to-r from-[#FF9933] to-[#FFAC33] text-white hover:from-[#FF9933]/95 hover:to-[#FFAC33]/95 shadow-md hover:shadow-lg transition-all duration-200 border border-[#FF9933]/30",
        green: "bg-gradient-to-r from-[#138808] to-[#1DA010] text-white hover:from-[#138808]/95 hover:to-[#1DA010]/95 shadow-md hover:shadow-lg transition-all duration-200 border border-[#138808]/30",
        navy: "bg-gradient-to-r from-[#000080] to-[#0000A0] text-white hover:from-[#000080]/95 hover:to-[#0000A0]/95 shadow-md hover:shadow-lg transition-all duration-200 border border-[#000080]/30",
        premium: "bg-gradient-to-r from-[#FF9933] via-[#FFC879] to-[#FF9933] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white shadow-md hover:shadow-lg transition-all duration-500 border border-[#138808]/20",
        glass: "bg-white/80 backdrop-blur-lg border border-white/40 text-[#000080] hover:bg-white/90 shadow-md hover:shadow-lg transition-all duration-200",
        subtle: "bg-white/90 backdrop-blur-sm border border-[#138808]/10 text-[#000080] hover:bg-[#138808]/5 hover:text-[#000080] shadow-sm hover:shadow transition-all duration-200",
        'premium-dark': "bg-gradient-to-r from-[#000080] via-[#3030A0] to-[#000080] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white shadow-md hover:shadow-lg transition-all duration-500 border border-[#000080]/20",
        'premium-green': "bg-gradient-to-r from-[#138808] via-[#35A82C] to-[#138808] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white shadow-md hover:shadow-lg transition-all duration-500 border border-[#138808]/20",
        'card-button': "bg-white/80 backdrop-blur-md border border-[#138808]/20 text-[#000080] hover:bg-[#FF9933]/10 hover:border-[#FF9933]/30 shadow-sm hover:shadow transition-all duration-200",
        'glass-blue': "bg-gradient-to-r from-[#000080]/10 to-[#000080]/5 backdrop-blur-md border border-[#000080]/20 text-[#000080] hover:bg-[#000080]/15 shadow-sm hover:shadow transition-all duration-200",
        'glass-saffron': "bg-gradient-to-r from-[#FF9933]/10 to-[#FF9933]/5 backdrop-blur-md border border-[#FF9933]/20 text-[#FF9933] hover:bg-[#FF9933]/15 shadow-sm hover:shadow transition-all duration-200",
        'glass-green': "bg-gradient-to-r from-[#138808]/10 to-[#138808]/5 backdrop-blur-md border border-[#138808]/20 text-[#138808] hover:bg-[#138808]/15 shadow-sm hover:shadow transition-all duration-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-lg",
        xl: "h-14 rounded-md px-10 text-xl",
        icon: "h-10 w-10",
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
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
