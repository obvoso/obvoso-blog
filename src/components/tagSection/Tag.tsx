"use client"

import selectTagsState from "@/atoms/selectCategoryTags"
import { TagEnum } from "@/types/tags"
import { Button } from "@mui/material"
import { useRecoilState } from "recoil"
import CustomTypography from "../common/CustomTypography"

type TagProps = {
  tagName: string
  type: TagEnum
  style?: string
}

export default function Tag({ tagName, type, style = "list" }: TagProps) {
  const [tag, setTag] = useRecoilState(selectTagsState)
  const isSelected = tag.tagName === tagName && tag.type === type

  const ButtonStyle = {
    button: {
      justifyContent: "center",
      whiteSpace: "nowrap",
      backgroundColor: "var(--background-secondary)",
      borderRadius: 50,
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
        onClick={handleClick}
        sx={{
          ...(style === "list" ? ButtonStyle.list : ButtonStyle.button),
        }}
      >
        <CustomTypography
          color={isSelected ? "var(--primary)" : "var(--tertiary)"}
          size={type === TagEnum.CATEGORY ? 14 : 12}
        >
          {tagName}
        </CustomTypography>
      </Button>
    </div>
  )
}
