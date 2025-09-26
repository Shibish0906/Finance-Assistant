"use client";

/**
 * Landing page
 *
 * App landing page with hero and feature sections. This is the public
 * homepage that introduces the product and links into the dashboard.
 */
import { motion } from "framer-motion";
import { PieChart, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          Take Control of Your <span className="text-blue-600">Finances</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl mb-8"
        >
          Track income, manage expenses, and visualize spending habits — all in one
          simple, secure app.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-4"
        >
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <button className="px-6 py-3 bg-white border rounded-md font-medium hover:bg-gray-100 transition">
            Learn More
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-50 rounded-xl shadow-sm"
          >
            <PieChart className="mx-auto text-blue-600" size={36} />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              Smart Analytics
            </h3>
            <p className="text-gray-600 mt-2">
              Visualize your expenses by category, time, and more with easy-to-read
              charts.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-50 rounded-xl shadow-sm"
          >
            <TrendingUp className="mx-auto text-blue-600" size={36} />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              Stay on Track
            </h3>
            <p className="text-gray-600 mt-2">
              Monitor income vs. expenses to always know your net balance.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-50 rounded-xl shadow-sm"
          >
            <ShieldCheck className="mx-auto text-blue-600" size={36} />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              Secure & Private
            </h3>
            <p className="text-gray-600 mt-2">
              Your financial data stays encrypted and private. Always in your control.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Finance Assistant. All rights reserved.
      </footer>
    </main>
  );
}
