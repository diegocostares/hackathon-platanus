const API_BASE_URL = "http://18.236.234.148:8000";

export async function switchMissionStatus(id: number) {
  const url = `${API_BASE_URL}/api/missions/${id}/switch-status`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("PATCH request failed:", errorData);
      throw new Error("PATCH request failed!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in switchMissionStatus:", error);
    throw error;
  }
}
