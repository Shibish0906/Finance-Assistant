"use client";

/**
 * DashboardPage
 *
 * Main authenticated dashboard route. Fetches transactions from Convex,
 * computes summary totals and renders charts. If the user is signed out the
 * `AuthDialog` is shown instead.
 */
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui";
import { ExpenseByCategory, CashflowOverTime } from "@/components/charts";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { AuthDialog } from "@/components/forms";
import { useEnsureUser } from "@/hooks/useEnsureUser";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

export default function DashboardPage() {
  useEnsureUser();

  // Fetch all transactions
  const transactions: Doc<"transactions">[] =
    useQuery(api.functions.transactions.Get.getAll, {}) ?? [];

  // Compute totals
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  // Show last 5 transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <>
      <SignedOut>
        <AuthDialog />
      </SignedOut>

      <SignedIn>
        <div className="space-y-10">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <ArrowUpCircle className="text-green-500" size={32} />
                <div>
                  <p className="text-sm text-gray-500">Income</p>
                  <p className="text-xl font-semibold text-gray-800">
                    ₹{income.toLocaleString()}
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex items-center gap-4">
                <ArrowDownCircle className="text-red-500" size={32} />
                <div>
                  <p className="text-sm text-gray-500">Expenses</p>
                  <p className="text-xl font-semibold text-gray-800">
                    ₹{expenses.toLocaleString()}
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex items-center gap-4">
                <Wallet className="text-blue-500" size={32} />
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  <p
                    className={`text-xl font-semibold ${
                      balance >= 0 ? "text-blue-600" : "text-red-600"
                    }`}
                  >
                    ₹{balance.toLocaleString()}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ExpenseByCategory transactions={transactions} />
            <CashflowOverTime transactions={transactions} />
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h3>
            </CardHeader>
            <CardBody>
              {recentTransactions.length === 0 ? (
                <p className="text-sm text-gray-500">No transactions yet.</p>
              ) : (
                <table className="w-full text-sm text-left text-gray-600">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="py-2">Date</th>
                      <th className="py-2">Category</th>
                      <th className="py-2">Note</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr key={tx._id} className="border-b last:border-0">
                        <td className="py-2">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className="py-2">{tx.category}</td>
                        <td className="py-2">{tx.note}</td>
                        <td
                          className={`py-2 text-right font-medium ${
                            tx.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.type === "income" ? "+" : "-"}₹
                          {Math.abs(tx.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardBody>
          </Card>
        </div>
      </SignedIn>
    </>
  );
}
