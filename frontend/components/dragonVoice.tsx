import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Mic } from "lucide-react";

export default function VoiceAssistant() {
    const [isListening, setIsListening] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleVoiceInput = async () => {
        setResponse(null); // Resetea la respuesta
        setIsListening(true); // Comienza a escuchar

        // Verifica si el navegador soporta Web Speech API
        if (!("webkitSpeechRecognition" in window)) {
            alert("Tu navegador no soporta reconocimiento de voz.");
            setIsListening(false);
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = "es-ES"; // Configura el idioma español
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = async (event: any) => {
            setIsListening(false);
            const userQuestion = event.results[0][0].transcript;
            console.log("Pregunta del usuario:", userQuestion);

            // Llama a OpenAI para obtener una respuesta
            setIsLoading(true);
            const aiResponse = await fetch("/api/ask-ai", { // CAMBIAR A ENDPOINT
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userQuestion }),
            }).then((res) => res.json());

            setResponse(aiResponse.answer); // Muestra la respuesta
            setIsLoading(false);
        };

        recognition.onerror = (event: any) => {
            console.error("Error en el reconocimiento de voz:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => setIsListening(false);

        recognition.start(); // Inicia la grabación
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <Button
                variant="outline"
                size="lg"
                onClick={handleVoiceInput}
                className="flex items-center gap-2"
                disabled={isListening || isLoading}
            ><Mic className="w-6 h-6" />
                {isListening ? "Escuchando..." : "Hazme una pregunta 📣"}
            </Button>

            {isLoading && (
                <div className="flex items-center gap-2">
                    <Loader className="animate-spin" /> Pensando...
                </div>
            )}

            {response && (
                <div className="bg-white shadow-md p-4 rounded-md max-w-md text-center">
                    <p className="text-lg font-bold">Respuesta:</p>
                    <p className="text-gray-700">{response}</p>
                </div>
            )}
        </div>
    );
}
