"use client";

/**
 * useEnsureUser
 *
 * Small hook that triggers a server-side ensureUser function when the client
 * reports that a user is signed in. Useful to create or sync user records.
 */
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useEnsureUser() {
  const { isSignedIn } = useAuth();
  const ensureUser = useMutation(api.functions.users.Profile.ensureUser);

  useEffect(() => {
    if (isSignedIn) {
      ensureUser().catch((err) => console.error("Failed to ensure user:", err));
    }
  }, [isSignedIn, ensureUser]);
}
