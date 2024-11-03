import InfiniteScrollArticles from "./InfiniteScrollArticles"
import pagenatedData from "./lib/paginatedData"

export default async function ArticlesList() {
  const paginatedData = await pagenatedData()

  return <InfiniteScrollArticles initialArticles={paginatedData} />
}
