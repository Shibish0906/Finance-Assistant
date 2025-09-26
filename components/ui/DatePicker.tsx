"use client";

/**
 * DatePicker
 *
 * Small date input wrapper with optional label and error. Uses native
 * `type="date"` to keep the control simple and accessible.
 */
import React from "react";
import { cn } from "@/lib/utils";

export interface DatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function DatePicker({
  label,
  error,
  className,
  id,
  ...props
}: DatePickerProps) {
  // Always call React.useId() to ensure hook order consistency.
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="date"
        className={cn(
          "w-full px-3 py-2 border rounded-md text-sm shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
