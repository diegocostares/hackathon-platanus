"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Mic } from "lucide-react";

export default function ExpensesPage() {
  const [gold, setGold] = useState(1000);
  const [items, setItems] = useState([
    { name: "Chocolate", price: 1500 },
    { name: "Pasaje Micro", price: 500 },
  ]);
  const [inputText, setInputText] = useState("");
  const [jsonError, setJsonError] = useState("");

  // Function to handle the Add button click
  const handleAdd = () => {
    try {
      // Convert the input text to JSON
      const jsonData = JSON.parse(inputText);

      // Validate that jsonData is an array of items with name and price
      if (Array.isArray(jsonData)) {
        const newItems = jsonData.map((item) => {
          if (item.name && item.price) {
            return { name: item.name, price: item.price };
          } else {
            throw new Error("Invalid item format");
          }
        });
        setItems([...items, ...newItems]);
        setInputText("");
        setJsonError("");
      } else {
        throw new Error("JSON should be an array of items");
      }
    } catch (error) {
      setJsonError(
        "El texto ingresado no es un JSON válido o el formato es incorrecto."
      );
    }
  };

  // Placeholder function for voice input (to be implemented with AI)
  const handleVoiceInput = () => {
    // Future implementation for AI voice transcription
    // For now, you can simulate this with a prompt
    const simulatedTranscription = prompt(
      "Simulación de entrada de voz: ingrese el texto transcrito en formato JSON."
    );
    if (simulatedTranscription) {
      setInputText(simulatedTranscription);
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

      {/* Explanation Text */}
      <p className="mb-4 text-center">
        Puede ingresar productos y precios manualmente o usar el
        micrófono para transcribir tu voz. Al presionar &quot;Añadir&quot;, los
        productos se agregarán a la lista.
      </p>

      {/* Input fields with microphone and add button */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
        {/* Microphone button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 mb-2 sm:mb-0"
        >
          <Mic className="w-6 h-6" />
        </button>
        {/* Large input field */}
        <textarea
          placeholder='Ingrese texto aquí...'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border p-2 flex-1 w-full sm:w-auto mb-2 sm:mb-0"
          rows={4}
        />
        {/* Add button */}
        <button
          type="button"
          onClick={handleAdd}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 mb-2 sm:mb-0"
        >
          Añadir
        </button>
      </div>

      {/* Display JSON Error */}
      {jsonError && <div className="text-red-500 mb-4">{jsonError}</div>}
    </div>
  );
}
