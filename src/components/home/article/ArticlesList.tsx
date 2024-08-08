import { getAllPost } from "@/services/notion"
import { NotionData } from "@/types/notion"
import ArticleThumbnail from "./ArticleThumbnail"

export default async function ArticlesList() {
  const data: NotionData[] = await getAllPost()

  return (
    <div>
      {data.map((post) => {
        return (
          <div key={post.id}>
            <ArticleThumbnail article={post} />
          </div>
        )
      })}
    </div>
  )
}
