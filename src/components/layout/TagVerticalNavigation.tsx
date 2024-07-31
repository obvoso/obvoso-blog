"use client"

import {
  selectCategoryState,
  selectTagsState,
} from "@/app/atoms/selectCategoryTags"
import { Category } from "@/types/tags"
import { Button } from "@mui/material"
import { useState } from "react"
import { useRecoilState } from "recoil"

export default function TagVerticalNavigation({
  initialCategories,
}: {
  initialCategories: any
}) {
  const [data, setData] = useState<Category[]>(initialCategories)
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryState)
  const [selectTags, setSelectTags] = useRecoilState(selectTagsState)

  function onClickCategory(category: string) {
    if (category) {
      setSelectCategory(category)
      setSelectTags(null)
    }
  }

  function onClickTag(category: string, tag: string) {
    setSelectCategory(category)
    setSelectTags(tag)
  }
  if (data.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {data.map((category: any) => {
        return (
          <div key={category.category}>
            <Button
              onClick={() => onClickCategory(category.category)}
              sx={{
                backgroundColor:
                  selectCategory === category.category
                    ? "var(--primary)"
                    : "var(--secondary)",
                color: selectCategory === category.category ? "white" : "black",
              }}
            >
              {category.category}
            </Button>
            <ul>
              {category.tags.map((tag: any) => {
                return (
                  <li key={tag.tag}>
                    <Button
                      onClick={() => onClickTag(category.category, tag.tag)}
                      sx={{
                        backgroundColor:
                          selectTags === tag.tag
                            ? "var(--primary)"
                            : "var(--secondary)",
                        color: selectTags === tag.tag ? "white" : "black",
                      }}
                    >
                      {tag.tag}
                    </Button>
                    <span>({tag.count})</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
