import { NotionData } from "@/types/notion"
import { getAllPost } from "./notion"
import { categorizeData } from "./utils"

export async function getAllCategory() {
  const data = await getAllPost()

  return categorizeData(data)
}

export async function getAllCategoryTags(): Promise<NotionData[]> {
  const data = await getAllPost()
  return data
}

export async function getSelectCategory(category: string) {
  const data = await getAllPost()
  return data.filter((item: NotionData) => item.category === category)
}

export async function getSelectTags(data: NotionData[], tags: string) {
  return data.filter((item: NotionData) => item.tag.includes(tags))
}
