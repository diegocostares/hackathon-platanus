"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Mic, Plus } from "lucide-react";

export default function ExpensesPage() {
  const [gold, setGold] = useState(1000);
  const [items, setItems] = useState([
    { name: "Chocolate", price: 1500 },
    { name: "Pasaje Micro", price: 500 },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  const addItem = () => {
    if (newItemName && newItemPrice) {
      const price = parseFloat(newItemPrice);
      if (!isNaN(price)) {
        setItems([...items, { name: newItemName, price }]);
        setNewItemName("");
        setNewItemPrice("");
      }
    }
  };

  return (
    <div className="min-h-screen sky p-4">
      {/* Header with title and gold amount */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Uso del oro</h1>
        <Card className="px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 text-2xl">💰</span>
            <span className="font-bold text-xl">{gold}</span>
          </div>
        </Card>
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

      {/* Input fields with microphone and plus symbols */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        {/* Microphone symbol */}
        <button type="button" className="mb-2 sm:mb-0">
          <Mic className="text-2xl" />
        </button>
        {/* Input for item name */}
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="border p-2 flex-1 w-full sm:w-auto mb-2 sm:mb-0"
        />
        {/* Input for item price with added margin-right */}
        <input
          type="number"
          placeholder="Precio"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          className="border p-2 flex-1 w-full sm:w-auto mb-2 sm:mb-0"
        />

        <button type="button" onClick={addItem} className="mb-2 sm:mb-0">
          Añadir producto
        </button>
      </div>
    </div>
  );
}
