import { TagEnum } from "@/types/tags"
import InfiniteScrollArticles from "./InfiniteScrollArticles"
import { fetchTagArticles } from "./actions"

export default async function ArticlesList() {
  const initialArticles = await fetchTagArticles({
    tag: { tagName: "전체보기", type: TagEnum.CATEGORY },
  })

  return <InfiniteScrollArticles initialArticles={initialArticles} />
}
