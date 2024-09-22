"use client"

import GradientButton from "@/app/components/common/GradientButton"
import selectTagsState from "@/atoms/selectCategoryTags"
import { TagEnum } from "@/types/tags"
import { useRecoilState } from "recoil"

type TagProps = {
  tagName: string
  type: TagEnum
  viewStyle?: string
}

export default function Tag({ tagName, type, viewStyle = "list" }: TagProps) {
  const [tag, setTag] = useRecoilState(selectTagsState)
  const isSelected = tag.tagName === tagName && tag.type === type

  const handleClick = () => {
    setTag({ tagName, type })
  }

  return (
    <GradientButton
      text={tagName}
      onClick={handleClick}
      isSelected={isSelected}
      size={12}
    />
  )
}
