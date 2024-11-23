const API_BASE_URL = "http://18.236.234.148:8000";

export async function getFetcher(url, headers) {
  try {
    const apiUrl = `${API_BASE_URL}${url}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("GET request failed:", errorData);
      throw new Error("GET request failed!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
