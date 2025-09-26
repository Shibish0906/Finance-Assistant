"use client";

/**
 * Input
 *
 * A lightweight input component that supports a label and error message.
 * Forwards native input props and accepts className for styling.
 */
import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    // Always call React.useId() to satisfy the Hooks rules. Use the
    // provided `id` when available, otherwise fall back to the generated id.
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-400",
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
);

Input.displayName = "Input";

export default Input;
