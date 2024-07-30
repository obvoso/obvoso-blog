import { getAllPost } from "./notion"
import { categorizeData } from "./utils"

export async function getAllCategory() {
  const data = await getAllPost()

  return categorizeData(data)
}
