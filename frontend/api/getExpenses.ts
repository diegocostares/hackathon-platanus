import { getFetcher } from "./fetchers";

export async function getExpenses() {
  return await getFetcher("/api/expenses/0", new Headers());
}
