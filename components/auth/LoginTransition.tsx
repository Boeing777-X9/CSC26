"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

interface LoginTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const LoginTransition: React.FC<LoginTransitionProps> = ({
  children,
  className = "",
}) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    router.prefetch("/auth");
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      setIsTransitioning(true);

      // Route to /auth as stars flow and expand across the full screen
      setTimeout(() => {
        router.push("/auth");
      }, 2100);

      // Fade out canvas overlay as stars complete their wipe sequence
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2900);
    },
    [router, isTransitioning]
  );

  const overlayContent = (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden pointer-events-auto"
        >
          {/* Full Screen Spiral Canvas — Pure rotating star animation */}
          <div className="absolute inset-0 w-full h-full">
            <SpiralAnimation />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <span onClick={handleClick} className={`inline-block cursor-pointer ${className}`}>
        {children}
      </span>

      {/* Render overlay at root document.body via Portal */}
      {mounted && typeof document !== "undefined"
        ? createPortal(overlayContent, document.body)
        : null}
    </>
  );
};

export default LoginTransition;
