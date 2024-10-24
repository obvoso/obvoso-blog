"use server"

import { getAllPost } from "@/lib/api/notion"
import { NotionData } from "@/types/notion"
import { TagEnum, TagType } from "@/types/tags"

export async function fetchTagArticles({
  tag,
  page = 0,
}: {
  tag: TagType
  page?: number
}) {
  const itemsPerPage = 4
  const res = await getAllPost()
  const filteredData = res.filter((post: NotionData) => {
    if (tag.tagName === "전체보기") return true
    if (tag.type === TagEnum.TAG && post.tag.includes(tag.tagName)) return true
    if (tag.type === TagEnum.CATEGORY && post.category === tag.tagName)
      return true
    return false
  })
  const start = page * itemsPerPage
  const end = start + itemsPerPage
  const moreData = filteredData.slice(start, end)
  return moreData
}
