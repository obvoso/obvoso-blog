import { getAllPost } from "@/lib/api/notion"
import InfiniteScrollArticles from "./components/InfiniteScrollArticles"

export default async function ArticlesList() {
  const articles = await getAllPost()

  return <InfiniteScrollArticles initialArticles={articles} />
}
