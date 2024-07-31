"use client"

import {
  selectCategoryState,
  selectTagsState,
} from "@/app/atoms/selectCategoryTags"
import { NotionData } from "@/types/notion"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

export default function Articles({ initialPosts }: { initialPosts: any }) {
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryState)
  const [selectTags, setSelectTags] = useRecoilState(selectTagsState)
  const [data, setData] = useState<NotionData[]>(initialPosts)

  useEffect(() => {
    async function fetchData() {
      let result = initialPosts
      if (selectCategory === "전체보기") {
        result = initialPosts
      } else if (selectCategory && !selectTags) {
        result = initialPosts.filter(
          (post: NotionData) => post.category === selectCategory,
        )
      } else if (selectCategory && selectTags) {
        result = initialPosts.filter(
          (post: NotionData) =>
            post.category === selectCategory && post.tag.includes(selectTags),
        )
      }
      setData(result)
    }
    fetchData()
  }, [selectCategory, selectTags, initialPosts])

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.title}>
            <h2>{item.title}</h2>
          </div>
        )
      })}
    </div>
  )
}
