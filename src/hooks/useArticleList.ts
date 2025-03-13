import selectTagsState from "@/atoms/selectCategoryTags"
import { NotionData } from "@/types/notion"
import { TagEnum } from "@/types/tags"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

export default function useArticleList(initialArticles: NotionData[]) {
  const selectedTags = useRecoilValue(selectTagsState)
  const [articleList, setArticleList] = useState<NotionData[]>(initialArticles)

  useEffect(() => {
    // 카테고리를 선택했을 때
    if (selectedTags.type === TagEnum.CATEGORY) {
      // 전체보기를 선택했을 때, 전체보기는 노션 카테고리에 없으므로 예외처리
      if (selectedTags.tagName === "전체보기") {
        setArticleList(initialArticles)
      } else {
        setArticleList(
          initialArticles.filter(
            (article) => article.category === selectedTags.tagName,
          ),
        )
      }
      // 태그를 선택했을 때
    } else {
      setArticleList(
        initialArticles.filter((article) =>
          article.tag.includes(selectedTags.tagName),
        ),
      )
    }
  }, [selectedTags, initialArticles])

  return articleList
}
