import { getFetcher } from "./fetchers";

export async function getAllowance() {
  return await getFetcher("/api/allowances/1", new Headers());
}
