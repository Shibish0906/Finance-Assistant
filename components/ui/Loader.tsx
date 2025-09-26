"use client";

/**
 * Loader
 *
 * Small spinner used to indicate loading states. Supports size and color
 * variations as small utility props.
 */
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "gray" | "white";
  label?: string;
  className?: string;
}

export default function Loader({
  size = "md",
  color = "blue",
  label,
  className,
}: LoaderProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  const colors = {
    blue: "border-blue-600 border-t-transparent",
    gray: "border-gray-500 border-t-transparent",
    white: "border-white border-t-transparent",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "animate-spin rounded-full",
          sizes[size],
          colors[color],
          className
        )}
      />
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </div>
  );
}
