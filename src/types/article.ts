import { NotionData } from "./notion"

export type PaginationData = {
  [category: string]: { [tag: string]: NotionData[][] }
}
