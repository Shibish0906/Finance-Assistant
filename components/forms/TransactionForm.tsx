"use client";

/**
 * TransactionForm
 *
 * File purpose:
 * Renders a dialog form for creating transactions. Uses Convex mutations to
 * persist data and reuses UI primitives from `components/ui` for styling.
 */
import { useState } from "react";
import {Button, Dialog, Input, Select, DatePicker} from "@/components/ui";
import { CATEGORIES } from "@/lib/categories";

// Convex imports
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// TransactionForm component: handles input state and mutation on submit.
export default function TransactionForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0] ?? "Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  const addTransaction = useMutation(api.functions.transactions.Add.add);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addTransaction({
        type,
        amount: Number(amount),
        category,
        date,
        note: note || undefined,
      });

      // reset form
      setType("expense");
      setAmount("");
      setCategory(CATEGORIES[0] ?? "Food");
      setDate(new Date().toISOString().split("T")[0]);
      setNote("");

      onClose(); // close after saving
    } catch (err) {
      console.error("Failed to save transaction:", err);
      alert("Could not save transaction, try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Add New Transaction</h2>
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
          placeholder="Enter amount"
        />

        {/* Category */}
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        {/* Date */}
        <DatePicker
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Dialog>
  );
}
