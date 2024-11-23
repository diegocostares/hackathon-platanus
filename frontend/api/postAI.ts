import { postFetcher } from "./fetchers";

export async function postAI(question: string): Promise<string> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const response = await postFetcher("/dragonAI", headers, { question });
    return response.answer;
  } catch (error) {
    console.error("Error in postAI:", error);
    throw new Error("Failed to fetch AI response");
  }
}
