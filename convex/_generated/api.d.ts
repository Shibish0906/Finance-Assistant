/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_transactions_Add from "../functions/transactions/Add.js";
import type * as functions_transactions_Analytics from "../functions/transactions/Analytics.js";
import type * as functions_transactions_Delete from "../functions/transactions/Delete.js";
import type * as functions_transactions_Get from "../functions/transactions/Get.js";
import type * as functions_transactions_Update from "../functions/transactions/Update.js";
import type * as functions_transactions_index from "../functions/transactions/index.js";
import type * as functions_users_Profile from "../functions/users/Profile.js";
import type * as functions_users_index from "../functions/users/index.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/transactions/Add": typeof functions_transactions_Add;
  "functions/transactions/Analytics": typeof functions_transactions_Analytics;
  "functions/transactions/Delete": typeof functions_transactions_Delete;
  "functions/transactions/Get": typeof functions_transactions_Get;
  "functions/transactions/Update": typeof functions_transactions_Update;
  "functions/transactions/index": typeof functions_transactions_index;
  "functions/users/Profile": typeof functions_users_Profile;
  "functions/users/index": typeof functions_users_index;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
