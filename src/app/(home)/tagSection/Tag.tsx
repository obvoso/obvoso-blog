"use client"

import selectTagsState from "@/atoms/selectCategoryTags"
import { TagEnum } from "@/types/tags"
import { Button } from "@mui/material"
import { useRecoilState } from "recoil"

type TagProps = {
  tagName: string
  type: TagEnum
  viewStyle?: string
}

export default function Tag({ tagName, type, viewStyle = "list" }: TagProps) {
  const [tag, setTag] = useRecoilState(selectTagsState)
  const isSelected = tag.tagName === tagName && tag.type === type

  const ButtonStyle = {
    button: {
      justifyContent: "center",
      whiteSpace: "nowrap",
      borderBottom: isSelected ? "1px solid var(--text-tertiatry)" : "none",
      borderRadius: 0,
    },
    list: {
      justifyContent: "flex-start",
      whiteSpace: "nowrap",
    },
  }

  const handleClick = () => {
    setTag({ tagName, type })
  }

  return (
    <div>
      <Button
        disableRipple
        onClick={handleClick}
        sx={{
          ...(viewStyle === "list" ? ButtonStyle.list : ButtonStyle.button),
          color: isSelected ? "var(--text-tertiatry)" : "var(--text)",
          fontFamily: "var(--noto)",
          fontWeight: isSelected ? "500" : "200",
          "&:hover": {
            color: "var(--text-tertiatry)",
            backgroundColor: "var(--background)",
          },
          "&:click": { backgroundColor: "var(--background)" },
        }}
      >
        {tagName}
      </Button>
    </div>
  )
}