const API_BASE_URL = "http://18.236.234.148:8000";

export async function updateMissionStatus(id: number, status: string) {
  const url = `${API_BASE_URL}/api/missions/${id}/`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("PATCH request failed:", errorData);
      throw new Error("PATCH request failed!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in updateMissionStatus:", error);
    throw error;
  }
}
