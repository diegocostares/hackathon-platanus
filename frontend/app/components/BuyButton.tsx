"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function BuyButton() {
  const [showBuyView, setShowBuyView] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Health Potion", price: 50, quantity: 0 },
    { id: 2, name: "Sword", price: 200, quantity: 0 },
    { id: 3, name: "Shield", price: 150, quantity: 0 },
  ]);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  return (
    <div>
      <button
        onClick={() => setShowBuyView(!showBuyView)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {showBuyView ? "Close" : "Buy"}
      </button>

      {showBuyView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ShoppingCart className="mr-2" />
              Buy Items
              <span className="ml-auto text-sm bg-blue-500 px-2 py-1 rounded">
                Total: {totalQuantity}
              </span>
            </h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span>
                    {item.name} - {item.price} gold
                  </span>
                  <div>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="bg-gray-700 px-3 py-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
