"use client";

/**
 * Button
 *
 * A small design-system button used across the app. Supports basic
 * `variant` and `size` props and forwards native button attributes.
 */
import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...rest
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
