"use client"

import selectTagsState from "@/atoms/selectCategoryTags"
import { TagEnum } from "@/types/tags"
import { ReactNode } from "react"
import { useRecoilState } from "recoil"

type TagProps = {
  tagName: string
  children: (props: { isSelected: boolean; onClick: () => void }) => ReactNode
  type: TagEnum
}

export default function Tag({ tagName, type, children }: TagProps) {
  const [tag, setTag] = useRecoilState(selectTagsState)
  const isSelected = tag.tagName === tagName && tag.type === type

  const handleClick = () => {
    setTag({ tagName, type })
  }

  return <>{children({ isSelected, onClick: handleClick })}</>
}
