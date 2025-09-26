import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    
  transactions: defineTable({
    userId: v.string(), // Clerk user ID
    type: v.union(v.literal("income"), v.literal("expense")),
    amount: v.number(),
    category: v.string(),
    note: v.optional(v.string()),
    date: v.string(), 
    createdAt: v.string(), 
  }),


  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    currency: v.optional(v.string()), 
    createdAt: v.string(),
  }),
});
