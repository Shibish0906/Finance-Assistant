"use client";

/**
 * AuthDialog
 *
 * File purpose:
 * Presents a compact, app-styled authentication UI using Clerk's hosted
 * SignIn/SignUp components. Matches the app's visual language by using
 * design primitives from `components/ui`.
 */

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui";
import { Wallet, BarChart2, ShieldCheck } from "lucide-react";

// Top-level auth dialog component. Toggles between sign-in and sign-up modes.
export default function AuthDialog() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  // Render a two-column layout: branding (left) and Clerk forms (right).
  return (
    <div className="flex bg-gray-50">
      <div className="hidden md:flex flex-1 flex-col justify-center px-12 bg-white border-r">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Wallet size={32} />
            <h1 className="text-3xl font-bold">FinanceApp</h1>
          </div>
          <p className="text-lg text-gray-600">
            Smarter tools to track, save, and grow your money. Join thousands of
            users who’ve taken control of their finances.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <BarChart2 className="text-blue-600" size={18} />
              Visualize spending with easy charts
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={18} />
              Secure sign-in and data storage
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          {mode === "signIn" ? (
            <>
              {/* Sign-in heading */}
              <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome back 👋</h2>

              {/* Clerk sign-in component (appearance overrides for button styles) */}
              <SignIn
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                  },
                }}
                afterSignInUrl="/dashboard"
              />

              {/* Toggle to sign-up */}
              <p className="text-sm text-gray-600 text-center">
                Don’t have an account?{" "}
                <Button variant="secondary" size="sm" onClick={() => setMode("signUp")}>Sign up</Button>
              </p>
            </>
          ) : (
            <>
              {/* Sign-up heading */}
              <h2 className="text-2xl font-bold text-gray-800 text-center">Create your account 🚀</h2>

              {/* Clerk sign-up component */}
              <SignUp
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                  },
                }}
                afterSignUpUrl="/dashboard"
              />

              {/* Toggle to sign-in */}
              <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <Button variant="secondary" size="sm" onClick={() => setMode("signIn")}>Sign in</Button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
