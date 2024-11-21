import { getAllPost } from "@/lib/api/notion"
import { localDateParseToNumberDate } from "@/lib/utils/date"
import { MetadataRoute } from "next"

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://www.obvoso.site"

  const articles = await getAllPost()
  const url = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: localDateParseToNumberDate(article.createdTime).toISOString(),
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
