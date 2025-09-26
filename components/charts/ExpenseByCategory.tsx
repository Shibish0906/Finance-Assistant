"use client";

/**
 * ExpenseByCategory
 *
 * Presents a pie chart of expenses grouped by category. Accepts an optional
 * transactions array and safely renders zero values.
 */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import { CATEGORIES } from "@/lib/categories";
import { Doc } from "@/convex/_generated/dataModel";

type Props = {
  transactions?: Doc<"transactions">[]; // make it optional
};

const COLORS = [
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // violet
  "#06B6D4", // cyan
  "#F97316", // orange
  "#6366F1", // indigo
];

export default function ExpenseByCategory({ transactions = [] }: Props) {
  const totals: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      totals[t.category] = (totals[t.category] ?? 0) + t.amount;
    }
  });

  const data = CATEGORIES.map((c) => ({
    name: c,
    value: totals[c] ?? 0,
  }));

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Expenses by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={(props: PieLabelRenderProps) => {
              const name = String(props.name ?? "");
              const value = Number(props.value ?? 0);
              return value > 0 ? `${name}: ₹${value}` : "";
            }}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val: number) => `₹${val.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
