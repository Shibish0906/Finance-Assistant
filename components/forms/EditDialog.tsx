"use client";

import { useState, useEffect } from "react";
import { Dialog, Input, Select, DatePicker, Button } from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";

export default function EditDialog({
  open,
  onClose,
  transaction,
}: {
  open: boolean;
  onClose: () => void;
  transaction: Doc<"transactions"> | null;
}) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0] ?? "Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  const updateTransaction = useMutation(api.functions.transactions.Update.update);

  // Pre-fill fields when a transaction is passed in
  useEffect(() => {
    if (transaction) {
      setType(transaction.type as "income" | "expense");
      setAmount(String(transaction.amount));
      setCategory(transaction.category);
      setDate(transaction.date);
      setNote(transaction.note ?? "");
    }
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction) return;

    try {
      await updateTransaction({
        id: transaction._id as Id<"transactions">,
        type,
        amount: Number(amount),
        category,
        date,
        note: note || undefined,
      });

      onClose();
    } catch (err) {
      console.error("Failed to update transaction:", err);
      alert("Could not update transaction, try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            Income
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            Expense
          </label>
        </div>

        {/* Amount */}
        <Input
          label="Amount"
          type="number"
          min="1"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Category */}
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        {/* Date */}
        <DatePicker value={date} onChange={(e) => setDate(e.target.value)} />

        {/* Note */}
        <Input
          label="Note"
          type="text"
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Dialog>
  );
}
