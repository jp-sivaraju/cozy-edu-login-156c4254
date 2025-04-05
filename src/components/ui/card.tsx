
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-[#138808]/10 bg-white/90 backdrop-blur-md text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 border-b border-[#138808]/10", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight text-[#FF9933]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-[#000080]/80", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 border-t border-[#138808]/10 mt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Premium card variants
const PremiumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-[#FF9933]/20 bg-gradient-to-br from-white via-white to-[#F9F9F9] backdrop-blur-md text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in",
      className
    )}
    {...props}
  />
))
PremiumCard.displayName = "PremiumCard"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-white/40 bg-white/80 backdrop-blur-lg text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

const TricolorCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl overflow-hidden backdrop-blur-sm text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border-t-4 border-t-[#FF9933] border-b-4 border-b-[#138808] border-x border-x-[#138808]/10 bg-white/90",
      className
    )}
    {...props}
  />
))
TricolorCard.displayName = "TricolorCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  PremiumCard,
  GlassCard,
  TricolorCard
}
