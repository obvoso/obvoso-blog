import { getAllPost } from "@/lib/api/notion"
import FilteredArticles from "./components/FilteredArticles"

export default async function ArticlesList() {
  const articles = await getAllPost()

  return <FilteredArticles initialArticles={articles} />
}
