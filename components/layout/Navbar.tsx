"use client";

/**
 * Navbar
 *
 * Top navigation bar used across the app. Shows brand, route links, and
 * authentication controls (SignIn modal for signed-out users and UserButton
 * for signed-in users).
 */
import Link from "next/link";
import { LayoutDashboard, List } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: Brand */}
        <Link href="/" className="text-2xl font-bold text-blue-600">Finance Assistant</Link>

        {/* Center: Nav Links */}
        <nav className="flex gap-8 text-sm font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link
            href="/dashboard/transactions"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <List size={18} /> Transactions
          </Link>
        </nav>

        {/* Right: Auth */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Login / Signup
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
