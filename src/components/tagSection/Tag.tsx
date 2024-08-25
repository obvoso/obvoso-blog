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
      border: isSelected ? "1px solid var(--primary)" : "1px solid var(--text)",
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
          color={isSelected ? "var(--primary)" : "var(--text)"}
          size={12}
        >
          {type === "category" ? tagName : `# ${tagName}`}
        </CustomTypography>
      </Button>
    </div>
  )
}
