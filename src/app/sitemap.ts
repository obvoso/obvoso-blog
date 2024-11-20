import { getAllPost } from "@/lib/api/notion"
import { MetadataRoute } from "next"

/**
 * yyyy년 mm월 dd일 형식의 문자열을 Date 객체로 변환합니다.
 */
function parseDate(dateString: string) {
  const dateParts = dateString.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
  // eslint-disable-next-line
  const [_, year, month, day] = dateParts || []
  return new Date(Number(year), Number(month) - 1, Number(day))
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://obvoso.site"

  const articles = await getAllPost()
  const url = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: parseDate(article.createdTime).toISOString(),
  }))

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    ...url,
  ]
}
