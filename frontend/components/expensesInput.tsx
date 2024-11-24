import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Mic } from "lucide-react";
import { askAI } from "@/api/postAI";

export default function ExpensesInput() {
    const [response, setResponse] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleVoiceInput = async () => {
        setResponse(null);

        // Check if the browser supports Web Speech API
        if (!("webkitSpeechRecognition" in window)) {
            alert("Tu navegador no soporta reconocimiento de voz.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = "es-ES";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = async (event: any) => {
            let userQuestion = event.results[0][0].transcript;
            setInputText(userQuestion);
        };

        recognition.onerror = (event: any) => {
            console.error("Error en el reconocimiento de voz:", event.error);
        };

        recognition.start();
    };

    const handleAdd = async () => {
        try {
            const question = inputText
            setIsLoading(true);

            const aiResponse = await askAI(question, "expenses");
            console.log(aiResponse);

            setResponse(aiResponse);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResponse("Error fetching AI response");
        } finally {
            setIsLoading(false);
            setInputText("");
        }
    };

    return (
        <>
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
                    placeholder="Ingresar gasto realizado (al presionar &quot;Añadir&quot; los productos se agregarán a la lista)."
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
        </>
    )
}
