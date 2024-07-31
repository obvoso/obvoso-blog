import { NotionData } from "@/types/notion"
import { Category } from "@/types/tags"

export function generateSlug(title: string) {
  return encodeURIComponent(title.toLowerCase().replace(/ /g, "-"))
}

export function categorizeData(data: NotionData[]): Category[] {
  const categoryMap: { [key: string]: { [key: string]: number } } = {}

  data.forEach((item) => {
    const { category, tag } = item
    if (!categoryMap[category]) {
      categoryMap[category] = {}
    }

    tag.forEach((t) => {
      if (!categoryMap[category][t]) {
        categoryMap[category][t] = 0
      }
      categoryMap[category][t]++
    })
  })

  const result: Category[] = Object.keys(categoryMap).map((category) => {
    const tags = Object.keys(categoryMap[category]).map((tag) => ({
      tag,
      count: categoryMap[category][tag],
    }))

    return {
      category,
      tags,
    }
  })

  result.unshift({
    category: "전체보기",
    tags: [],
  })

  return result
}
