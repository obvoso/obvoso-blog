import { fetchTagArticles } from "@/app/(home)/components/article/actions"
import selectTagsState from "@/atoms/selectCategoryTags"
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
  const tag = useRecoilValue(selectTagsState)
  const [articleList, setArticleList] = useState<NotionData[]>(
    tag.tagName === "전체보기" ? initialArticles : [],
  )
  const [page, setPage] = useState(0)
  const [ref, inView] = useInView()

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
    setArticleList(articles)
  }

  useEffect(() => {
    loadTagArticles()
    return () => {
      setPage(0)
    }
  }, [tag])

  return {
    articleList,
    ref,
  }
}
