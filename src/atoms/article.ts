import { NotionData } from "@/types/notion"
import { atom, selector } from "recoil"

export const articleListState = atom({
  key: "articleListState",
  default: {
    articles: [] as NotionData[],
    hasMore: true,
    currentPage: 0,
  },
})

export const articleListSelector = selector({
  key: "articleListSelector",
  get: ({ get }) => get(articleListState).articles,
  set: ({ set }, newValue) =>
    set(articleListState, (prev) => ({
      ...prev,
      articles: newValue as unknown as NotionData[],
    })),
})

export const articleListHasMoreSelector = selector({
  key: "articleListHasMoreSelector",
  get: ({ get }) => get(articleListState).hasMore,
  set: ({ set }, newValue) =>
    set(articleListState, (prev) => ({
      ...prev,
      hasMore: newValue as boolean,
    })),
})

export const articleListCurrentPageSelector = selector({
  key: "articleListCurrentPageSelector",
  get: ({ get }) => get(articleListState).currentPage,
  set: ({ set }, newValue) =>
    set(articleListState, (prev) => ({
      ...prev,
      currentPage: newValue as number,
    })),
})
