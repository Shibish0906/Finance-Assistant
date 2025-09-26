"use client";

/**
 * RootLayout
 *
 * Application root layout that sets up global providers (Clerk, Convex) and
 * renders the global chrome (Navbar, Sidebar) around route children.
 */
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { convex } from "@/lib/convexClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-100 text-gray-900">
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <div className="flex flex-col min-h-screen">
              {/* Navbar at the top */}
              <Navbar />

              <div className="flex flex-1">
                {/* Sidebar on the left */}
                <Sidebar />

                {/* Main content */}
                <main className="flex-1 p-6">{children}</main>
              </div>
            </div>
          </ConvexProviderWithClerk>
        </body>
      </html>
    </ClerkProvider>
  );
}
