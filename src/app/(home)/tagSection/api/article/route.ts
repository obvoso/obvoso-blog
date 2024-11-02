import { getAllPost } from "@/lib/api/notion"
import { NotionData } from "@/types/notion"
import { TagEnum } from "@/types/tags"
import { NextRequest } from "next/server"

const itemsPerPage = 4

export const config = {
  runtime: "edge",
}

export async function GET(request: NextRequest) {
  // eslint-disable-next-line prefer-destructuring
  const searchParams = request.nextUrl.searchParams
  const tagName = searchParams.get("tagName") ?? ""
  const type = searchParams.get("type")
  const page = Number(searchParams.get("page"))

  const res = await getAllPost()
  const filteredData = res.filter((post: NotionData) => {
    if (tagName === "전체보기") return true
    if (type === TagEnum.TAG && post.tag.includes(tagName)) return true
    if (type === TagEnum.CATEGORY && post.category === tagName) return true
    return false
  })
  const start = page * itemsPerPage
  const end = start + itemsPerPage
  const moreData = filteredData.slice(start, end)
  return Response.json(moreData, {
    headers: {
      "Cache-Control": "public, max-age=60",
      "Vercel-CDN-Cache-Control": "public, s-maxage=31536000",
    },
  })
}
