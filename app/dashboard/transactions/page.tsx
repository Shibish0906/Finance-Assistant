"use client";

/**
 * TransactionsPage
 *
 * Lists user transactions with search, filtering, selection and bulk delete
 * controls. Uses Convex queries/mutations to fetch and mutate data.
 */
import { useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Select,
} from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";
import { TransactionForm, AuthDialog } from "@/components/forms";
import EditDialog from "@/components/forms/EditDialog"; // <-- new import
import { Plus, Search } from "lucide-react";

const PAGE_SIZE = 10;

export default function TransactionsPage() {
  const { isLoaded, isSignedIn } = useAuth();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectionMode, setSelectionMode] = useState(false);
  const [selected, setSelected] = useState<Id<"transactions">[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [editingTx, setEditingTx] = useState<Doc<"transactions"> | null>(null);

  // Keep the raw query result stable and derive a memoized array so that
  // downstream useMemo hooks don't see a new value on every render.
  const transactionsData = useQuery(
    api.functions.transactions.Get.getAll,
    {}
  );

  const transactions: Doc<"transactions">[] = useMemo(
    () => transactionsData ?? [],
    [transactionsData]
  );

  const deleteTransaction = useMutation(
    api.functions.transactions.Delete.remove
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (q && !(`${t.note ?? ""} ${t.category}`.toLowerCase().includes(q)))
        return false;
      return true;
    });
  }, [query, category, transactions]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totals = useMemo(() => {
    const income = filtered
      .filter((f) => f.type === "income")
      .reduce((s, r) => s + r.amount, 0);

    const expense = filtered
      .filter((f) => f.type === "expense")
      .reduce((s, r) => s + r.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [filtered]);

  return (
    <>
      {!isLoaded ? (
        <p className="text-gray-500">Loading authentication…</p>
      ) : !isSignedIn ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <AuthDialog />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
              <p className="text-sm text-gray-500">
                All recorded transactions — search, filter and export.
              </p>
            </div>
            <Button
              size="md"
              className="flex items-center gap-2"
              onClick={() => setShowNew(true)}
            >
              <Plus size={16} /> New
            </Button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-xl font-semibold text-green-600">
                ₹{totals.income.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-xl font-semibold text-red-600">
                ₹{totals.expense.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-500">Balance</p>
              <p
                className={`text-xl font-semibold ${
                  totals.balance >= 0 ? "text-blue-600" : "text-red-600"
                }`}
              >
                ₹{totals.balance.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Toolbar */}
          <Card>
            <CardBody>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2 w-full md:w-3/4">
                  <div className="relative flex-1">
                    <Input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Search by note or category"
                      className="pr-10 h-10 text-gray-800 bg-white w-full"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Search size={16} />
                    </span>
                  </div>

                  <Select
                    className="w-36 h-10 text-gray-800 bg-white"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="all">All categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  {!selectionMode ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectionMode(true);
                        setSelected([]);
                      }}
                    >
                      Select
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectionMode(false);
                          setSelected([]);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={async () => {
                          if (selected.length === 0) return;
                          const ok = window.confirm(
                            `Delete ${selected.length} selected transaction(s)?`
                          );
                          if (!ok) return;
                          await Promise.all(
                            selected.map((id) => deleteTransaction({ id }))
                          );
                          setSelected([]);
                          setSelectionMode(false);
                          setPage(1);
                        }}
                        disabled={selected.length === 0}
                      >
                        Delete Selected
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                All Transactions
              </h3>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead>
                    <tr className="text-gray-500 border-b bg-gray-50">
                      <th className="py-3 px-3"></th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Note</th>
                      <th className="py-3 px-3 text-right">Amount</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((tx) => (
                      <tr key={tx._id} className="border-b last:border-0">
                        <td className="py-3 px-3 align-top">
                          {selectionMode && (
                            <input
                              type="checkbox"
                              checked={selected.includes(tx._id)}
                              onChange={(e) => {
                                if (e.target.checked)
                                  setSelected((s) => [...s, tx._id]);
                                else
                                  setSelected((s) =>
                                    s.filter((id) => id !== tx._id)
                                  );
                              }}
                            />
                          )}
                        </td>
                        <td className="py-3 px-3 align-top">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3 align-top">{tx.category}</td>
                        <td className="py-3 px-3 align-top">{tx.note}</td>
                        <td
                          className={`py-3 px-3 text-right font-medium ${
                            tx.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.type === "income" ? "+" : "-"}₹
                          {Math.abs(tx.amount).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditingTx(tx)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {paginated.length} of {filtered.length} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <div className="px-3 py-1 text-sm text-gray-700">
                  Page {page} of {totalPages}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Dialogs */}
      <TransactionForm open={showNew} onClose={() => setShowNew(false)} />
      <EditDialog
        open={!!editingTx}
        onClose={() => setEditingTx(null)}
        transaction={editingTx}
      />
    </>
  );
}
