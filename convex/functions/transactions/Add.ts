/**
 * convex/functions/transactions/Add.ts
 *
 * Mutation to add a transaction for the authenticated user. Validates input
 * server-side and inserts a new `transactions` document.
 */
import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export const add = mutation({
  // validator
  args: {
    type: v.union(v.literal("income"), v.literal("expense")),
    amount: v.number(),
    category: v.string(),
    note: v.optional(v.string()),
    date: v.string(), 
  },

  // Handler
  handler: async (ctx : any, args : any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    if (args.amount <= 0) throw new Error("Amount must be greater than 0");
    if (!Date.parse(args.date)) throw new Error("Invalid date format");

    return await ctx.db.insert("transactions", {
      userId: identity.subject,
      ...args,
      createdAt: new Date().toISOString(),
    });
  },
});
