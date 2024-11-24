"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import ExpensesInput from "@/components/expensesInput";

export default function ExpensesPage() {
  const [gold, setGold] = useState(1000);
  const [items, setItems] = useState([
    { name: "Chocolate", price: 1500 },
    { name: "Pasaje Micro", price: 500 },
  ]);
  return (
    <div className="min-h-screen sky p-4 pt-16">
      {/* Header with title and gold amount */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Uso del oro</h1>
      </div>

      {/* List of purchased items */}
      <ul className="list-none mb-10">
        {items.map((item, index) => (
          <li key={index} className="flex flex-wrap">
            <span>{item.name}</span>
            <span
              className="flex-grow border-b border-dotted mx-2"
              style={{ marginTop: "0.75em" }}
            ></span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      <ExpensesInput />
    </div>
  );
}
