"use client";

/**
 * Select
 *
 * Simple select control with optional label and error display. Forwards
 * native select props and supports styling through `className`.
 */
import React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export default function Select({
  label,
  error,
  className,
  id,
  children,
  ...props
}: SelectProps) {
  // Always call React.useId() to ensure hook order consistency.
  const generatedId = React.useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full px-3 py-2 border rounded-md text-sm shadow-sm bg-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
