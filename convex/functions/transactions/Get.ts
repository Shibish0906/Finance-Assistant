/**
 * convex/functions/transactions/Get.ts
 *
 * Queries related to fetching transactions for the authenticated user. These
 * are read-only server-side queries intended to be called from the client.
 */
import { query } from "../../_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Not signed in → just return empty list
      return [];
    }

    return await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .filter((q) => q.eq(q.field("category"), category))
      .order("desc")
      .collect();
  },
});

export const search = query({
  args: { query: v.string() },
  handler: async (ctx, { query }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const all = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    const lower = query.toLowerCase();
    return all.filter(
      (t) =>
        t.category.toLowerCase().includes(lower) ||
        (t.note?.toLowerCase().includes(lower) ?? false)
    );
  },
});
