/**
 * convex/functions/users/Profile.ts
 *
 * User profile management queries and mutations. Ensures there's a user
 * document for authenticated Clerk users and allows saving/updating profile
 * fields.
 */
import { mutation, query } from "../../_generated/server";
import { v } from "convex/values";

export const saveProfile = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    currency: v.optional(v.string()), 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.subject))
      .first();

    if (existing) {
      // Update existing
      return await ctx.db.patch(existing._id, {
        ...args,
      });
    } else {
      // Insert new user profile
      return await ctx.db.insert("users", {
        clerkId: identity.subject,
        ...args,
        createdAt: new Date().toISOString(),
      });
    }
  },
});


export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.subject))
      .first();
  },
});

export const ensureUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), identity.subject))
      .first();

    if (!existing) {
      await ctx.db.insert("users", {
        clerkId: identity.subject,
        email: identity.email ?? "",
        name: identity.name ?? "Anonymous",
        createdAt: new Date().toISOString(),
      });
    }
  },
});
