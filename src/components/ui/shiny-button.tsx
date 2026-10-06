"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#FF8C32] via-[#FFA952] to-[#FF7900] px-6 py-2.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(255,140,50,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,140,50,0.7)] group cursor-pointer border border-[#FF8C32]/60",
          className
        )}
        {...props}
      >
        {/* Continuous Shimmer Light Animation Layer */}
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        
        {/* Animated Radial Pulse on Hover */}
        <span className="absolute -inset-px rounded-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

        {/* Content Wrapper */}
        <span className="relative z-10 flex items-center justify-center gap-2 font-sans font-bold tracking-wide">
          {children}
        </span>
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";

export default ShinyButton;
