"use client";

/**
 * Dialog
 *
 * A minimal modal dialog primitive that traps basic keyboard behavior (ESC to
 * close) and renders a backdrop. Keep content presentation inside `children`.
 */
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ open, onClose, children }: DialogProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Dialog content */}
      <div
        className={cn(
          "relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10",
          "animate-in fade-in-0 zoom-in-95"
        )}
      >
        {children}
      </div>
    </div>
  );
}
