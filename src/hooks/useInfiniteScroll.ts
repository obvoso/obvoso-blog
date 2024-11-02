import {
  articleListCurrentPageSelector,
  articleListHasMoreSelector,
  articleListSelector,
} from "@/atoms/article"
import selectTagsState from "@/atoms/selectCategoryTags"
import { NotionData } from "@/types/notion"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { useRecoilState, useRecoilValue } from "recoil"

type InfiniteScrollProps = {
  initialArticles: NotionData[]
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
      setArticleList(initialArticles)
    }
  }, [])

  /**
   * Load more articles when the user scrolls to the bottom of the page
   */
  async function loadMoreArticles() {
    const next = page + 1
    const data = await fetch(
      `http://localhost:3000/tagSection/api/article?tagName=${tag.tagName}&type=${tag.type}&page=${next}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    const articles = await data.json()

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
    const data = await fetch(
      `http://localhost:3000/tagSection/api/article?tagName=${tag.tagName}&type=${tag.type}&page=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    const articles = await data.json()
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
    returnArticleList = initialArticles
  }

  return {
    articleList: returnArticleList,
    ref,
  }
}
