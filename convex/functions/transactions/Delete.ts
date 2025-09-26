/**
 * convex/functions/transactions/Delete.ts
 *
 * Deletes a transaction owned by the authenticated user. Performs ownership
 * check before deletion and returns a boolean success flag.
 */
import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export const remove = mutation({
  args: {
    id: v.id("transactions"), 
  },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const transaction = await ctx.db.get(id);
    if (!transaction) throw new Error("Transaction not found");
    if (transaction.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(id);
    return true;
  },
});
