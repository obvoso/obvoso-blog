import InfiniteScrollArticles from "./components/InfiniteScrollArticles"
import getPaginatedData from "./lib/paginatedData"

export default async function ArticlesList() {
  const paginatedData = await getPaginatedData()

  return <InfiniteScrollArticles initialArticles={paginatedData} />
}
