import { TagEnum } from "@/types/tags"
import InfiniteScrollArticles from "./InfiniteScrollArticles"
// import { fetchTagArticles } from "./actions"

export default async function ArticlesList() {
  const data = await fetch(
    `http://localhost:3000/tagSection/api/article?tagName=전체보기&type=${TagEnum.CATEGORY}&page=0`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  const initialArticles = await data.json()

  return <InfiniteScrollArticles initialArticles={initialArticles} />
}
