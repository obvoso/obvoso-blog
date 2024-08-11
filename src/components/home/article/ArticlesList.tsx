import { getAllPost } from "@/services/notion"
import { NotionData } from "@/types/notion"
import Link from "next/link"
import ArticleThumbnail from "./ArticleThumbnail"

export default async function ArticlesList() {
  const data: NotionData[] = await getAllPost()

  return (
    <div>
      {data.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/articles/${post.slug}`}>
              <ArticleThumbnail article={post} />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
