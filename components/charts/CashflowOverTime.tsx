"use client";

/**
 * CashflowOverTime
 *
 * Renders a simple line chart aggregating monthly income and expenses. Expects
 * `transactions` as input and groups them by month.
 */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Doc } from "@/convex/_generated/dataModel";

type Props = {
  transactions: Doc<"transactions">[];
};

export default function CashflowOverTime({ transactions }: Props) {
  // Group transactions by month (YYYY-MM)
  const monthlyMap: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);
    const month = d.toLocaleString("default", { month: "short" });
    const key = `${month} ${d.getFullYear()}`;

    if (!monthlyMap[key]) {
      monthlyMap[key] = { income: 0, expenses: 0 };
    }

    if (t.type === "income") {
      monthlyMap[key].income += t.amount;
    } else {
      monthlyMap[key].expenses += t.amount;
    }
  });

  // Convert to array sorted by date
  const data = Object.entries(monthlyMap)
    .map(([month, values]) => ({
      month,
      income: values.income,
      expenses: values.expenses,
    }))
    .sort((a, b) => {
      const [mA, yA] = a.month.split(" ");
      const [mB, yB] = b.month.split(" ");
      const dateA = new Date(`${mA} 1, ${yA}`).getTime();
      const dateB = new Date(`${mB} 1, ${yB}`).getTime();
      return dateA - dateB;
    });

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Cashflow Over Time
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10B981" // green
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#EF4444" // red
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
