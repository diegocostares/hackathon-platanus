const API_BASE_URL = "http://18.236.234.148:8000";

export async function getInventory() {
  const url = `${API_BASE_URL}/api/inventories/inventories`;
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
    console.error("Error in getMissions:", error);
    throw error;
  }
}
