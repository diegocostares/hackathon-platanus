const API_BASE_URL = "http://18.236.234.148:8000";

export async function updateAllowance(allowanceId: number, amount: number, action: 'add' | 'subtract') {
  const url = `${API_BASE_URL}/api/allowances/${allowanceId}/${action}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("PATCH request failed:", errorData);
      throw new Error("PATCH request failed!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in updateAllowance:", error);
    throw error;
  }
}
