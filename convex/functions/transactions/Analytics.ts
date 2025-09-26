/**
 * convex/functions/transactions/Analytics.ts
 *
 * Analytics queries for transactions: compute balances, expense-by-category
 * and cashflow over time for the authenticated user.
 */
import { query } from "../../_generated/server";
import { v } from "convex/values";

export const getBalance = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const txs = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    let income = 0;
    let expense = 0;

    for (const t of txs) {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    }

    return { income, expense, balance: income - expense };
  },
});

export const expenseByCategory = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const txs = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .filter((q) => q.eq(q.field("type"), "expense"))
      .collect();

    const result: Record<string, number> = {};
    for (const t of txs) {
      result[t.category] = (result[t.category] ?? 0) + t.amount;
    }

    return result;
  },
});

export const cashflowOverTime = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const txs = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    const result: Record<string, { income: number; expense: number }> = {};

    for (const t of txs) {
      const day = t.date.split("T")[0]; 
      if (!result[day]) result[day] = { income: 0, expense: 0 };

      if (t.type === "income") result[day].income += t.amount;
      else result[day].expense += t.amount;
    }

    return result; 
  },
});
