/**
 * lib/convexClient.ts
 *
 * Initializes the Convex React client using the NEXT_PUBLIC_CONVEX_URL
 * environment variable. This client is provided via ConvexProvider in the
 * app root.
 */
import { ConvexReactClient } from "convex/react";

export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
