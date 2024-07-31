import { NotionData } from "@/types/notion"
import { atom } from "recoil"

export const selectCategoryState = atom<string | null>({
  key: "selectCategoryState",
  default: "전체보기",
})

export const selectTagsState = atom<string | null>({
  key: "selectTagsState",
  default: null,
})

export const selectCategoryTagsState = atom<NotionData[]>({
  key: "selectCategoryTagsState",
  default: [],
})
