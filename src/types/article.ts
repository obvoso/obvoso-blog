import { NotionData } from "./notion"

export type PaginationData = {
  postsById: { [id: string]: NotionData }
  categoryIndex: { [categoryName: string]: string[] }
  tagIndex: { [tagName: string]: string[] }
}
