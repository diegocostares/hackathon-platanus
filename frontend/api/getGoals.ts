const API_BASE_URL = "http://18.236.234.148:8000";

export interface Goal {
  id: number;
  name: string;
  reward: number;
  description: string;
  unlocked: boolean;
  image: string;
}

export async function getGoals(): Promise<Goal[]> {
  const url = `${API_BASE_URL}/api/goals/`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GET request failed:", errorData);
      throw new Error("GET request failed!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getGoals:", error);
    throw error;
  }
}
