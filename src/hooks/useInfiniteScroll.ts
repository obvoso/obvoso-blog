import {
  articleListCurrentPageSelector,
  articleListHasMoreSelector,
  articleListSelector,
} from "@/atoms/article"
import selectTagsState from "@/atoms/selectCategoryTags"
import { PaginationData } from "@/types/article"
import { NotionData } from "@/types/notion"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { useRecoilState, useRecoilValue } from "recoil"

type InfiniteScrollProps = {
  initialArticles: PaginationData
}
export default function useInfiniteScroll({
  initialArticles,
}: InfiniteScrollProps) {
  const tag = useRecoilValue(selectTagsState)
  const [articleList, setArticleList] = useRecoilState(articleListSelector)
  const [page, setPage] = useRecoilState(articleListCurrentPageSelector)
  const [hasMore, setHasMore] = useRecoilState(articleListHasMoreSelector)
  const [ref, inView] = useInView()
  const previousTag = useRef(tag)

  useEffect(() => {
    if (!articleList.length) {
      const articles = initialArticles[tag.type]?.[tag.tagName]?.[0] || []
      setArticleList(articles)
    }
  }, [])

  /**
   * Load more articles when the user scrolls to the bottom of the page
   */
  async function loadMoreArticles() {
    const next = page + 1
    const articles = initialArticles[tag.type]?.[tag.tagName]?.[next] || []

    if (articles?.length) {
      setPage(next)
      setArticleList((prev) => [...prev, ...articles])
    } else {
      setHasMore(false)
    }
  }

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreArticles()
    }
  }, [inView, tag, hasMore])

  /**
   * Load articles based on the selected tag
   */
  async function loadTagArticles() {
    const articles = initialArticles[tag.type]?.[tag.tagName]?.[0] || []
    setArticleList(articles)
  }

  useLayoutEffect(() => {
    if (previousTag.current !== tag) {
      loadTagArticles()
      setPage(0)
      previousTag.current = tag
      setHasMore(true)
    }
  }, [tag])

  let returnArticleList: NotionData[] = []

  if (articleList.length) {
    returnArticleList = articleList
  } else if (tag.tagName === "전체보기") {
    returnArticleList = initialArticles[tag.type]?.[tag.tagName]?.[0] || []
  }

  return {
    articleList: returnArticleList,
    ref,
  }
}
