import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new document in convex
export const createDocument = mutation({
  args: {
    title: v.string(),
  },
  async handler(ctx, args) {
    //get user by tokenIdentifier it is better than by id
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    //if user is not authenticated, throw an error
    if (!userId) {
      throw new ConvexError("User not authenticated");
    }

    await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
    });
  },
});

// Get documents from convex by user
export const getDocuments = query({
  async handler(ctx) {
    //get user by tokenIdentifier it is better than by id
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    //if user is not authenticated, return empty array
    if (!userId) {
      return [];
    }
    //matching documents by tokenIdentifier
    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});
