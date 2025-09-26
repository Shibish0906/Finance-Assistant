/**
 * convex/functions/transactions/Update.ts
 *
 * Patches a transaction document with provided fields. Verifies ownership
 * before applying server-side patch operations.
 */
import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export const update = mutation({
  args: {
    id: v.id("transactions"),
    type: v.optional(v.union(v.literal("income"), v.literal("expense"))),
    amount: v.optional(v.number()),
    category: v.optional(v.string()),
    date: v.optional(v.string()), 
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db.get(args.id);
    if (!existing || existing.userId !== identity.subject) {
      throw new Error("Transaction not found or not yours");
    }

    // Build a patch only with provided fields
    const patch: Record<string, unknown> = {};
    if (args.type !== undefined) patch.type = args.type;
    if (args.amount !== undefined) patch.amount = Math.abs(args.amount); // keep amount positive
    if (args.category !== undefined) patch.category = args.category;
    if (args.date !== undefined) patch.date = args.date;
    if (args.note !== undefined) patch.note = args.note;

    if (Object.keys(patch).length > 0) {
      await ctx.db.patch(args.id, patch);
    }

    return args.id;
  },
});
