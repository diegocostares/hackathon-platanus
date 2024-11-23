const API_BASE_URL = "http://18.236.234.148:8000";

export async function askAI(question: string): Promise<string> {
  const encodedQuestion = encodeURIComponent(question);
  const url = `${API_BASE_URL}/api/dragonAI/?question=${encodedQuestion}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("POST request failed:", errorData);
      throw new Error("POST request failed!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in askAI:", error);
    throw error;
  }
}
