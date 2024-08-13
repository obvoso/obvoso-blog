import selectTagsState from "@/atoms/selectCategoryTags"
import { fetchTagArticles } from "@/components/home/article/actions"
import { NotionData } from "@/types/notion"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useRecoilValue } from "recoil"

type InfiniteScrollProps = {
  initialArticles: NotionData[]
}
export default function useInfiniteScroll({
  initialArticles,
}: InfiniteScrollProps) {
  const [articleList, setArticleList] = useState<NotionData[]>(initialArticles)
  const [page, setPage] = useState(0)
  const [ref, inView] = useInView()
  const tag = useRecoilValue(selectTagsState)

  /**
   * Load more articles when the user scrolls to the bottom of the page
   */
  async function loadMoreArticles() {
    const next = page + 1
    const articles = await fetchTagArticles({ tag, page: next })

    if (articles?.length) {
      setPage(next)
      setArticleList((prev) => [...prev, ...articles])
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreArticles()
    }
  }, [inView])

  /**
   * Load articles based on the selected tag
   */
  async function loadTagArticles() {
    const articles = await fetchTagArticles({ tag, page: 0 })
    if (articles?.length) {
      setPage(0)
      setArticleList(articles)
    }
    setArticleList(articles)
  }

  useEffect(() => {
    loadTagArticles()
  }, [tag])

  return {
    articleList,
    ref,
  }
}
