import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "orange" | "secondary" | "outline" | "ghost" | "cyber";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7900] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variants = {
      default:
        "bg-[#ff7900] text-white hover:bg-[#e06b00] shadow-[0_0_20px_rgba(255,121,0,0.4)] hover:shadow-[0_0_25px_rgba(255,121,0,0.6)]",
      orange:
        "bg-gradient-to-r from-[#ff7900] to-[#ff9533] text-black font-bold hover:brightness-110 shadow-[0_0_20px_rgba(255,121,0,0.4)]",
      secondary:
        "bg-[#161922] text-slate-200 border border-slate-700/60 hover:bg-[#1f2330] hover:border-slate-600 hover:text-white",
      outline:
        "border border-[#ff7900]/50 text-[#ff7900] hover:bg-[#ff7900]/10 hover:border-[#ff7900]",
      ghost:
        "text-slate-300 hover:bg-slate-800/60 hover:text-white",
      cyber:
        "bg-[#090a0f] text-white border border-[#ff7900] shadow-[inset_0_0_12px_rgba(255,121,0,0.25)] hover:shadow-[0_0_20px_rgba(255,121,0,0.5)] hover:bg-[#ff7900]/10",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs tracking-wider uppercase",
      md: "h-11 px-5 text-sm",
      lg: "h-13 px-7 text-base font-bold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
