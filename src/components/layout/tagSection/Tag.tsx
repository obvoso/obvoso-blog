"use client"

import { selectTagsState } from "@/atoms/selectCategoryTags"
import { TagEnum, TagType } from "@/types/tags"
import { Button } from "@mui/material"
import { useRecoilState } from "recoil"

export default function Tag({ tagName, type = TagEnum.TAG }: TagType) {
  const [tag, setTag] = useRecoilState(selectTagsState)
  const isSelected = tag.tagName === tagName && tag.type === type

  const handleClick = () => {
    setTag({ tagName, type })
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        sx={{
          color: isSelected ? "white" : "black",
          bgcolor: isSelected ? "var(--primary)" : "white",
        }}
      >
        {tagName}
      </Button>
    </div>
  )
}
