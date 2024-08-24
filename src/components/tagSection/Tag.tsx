"use client"

import selectTagsState from "@/atoms/selectCategoryTags"
import { TagType } from "@/types/tags"
import { Button } from "@mui/material"
import { useRecoilState } from "recoil"
import CustomTypography from "../common/CustomTypography"

export default function Tag({ tagName, type }: TagType) {
  const [tag, setTag] = useRecoilState(selectTagsState)
  const isSelected = tag.tagName === tagName && tag.type === type

  const ButtonStyle = {
    tag: {
      color: isSelected ? "var(--primary)" : "var(--text)",
      size: 12,
    },
    category: {
      color: isSelected ? "var(--primary)" : "var(--text-secondary)",
      weight: 500,
      size: 12,
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
          justifyContent: "left",
          whiteSpace: "nowrap",
        }}
      >
        <CustomTypography
          {...(type === "category" ? ButtonStyle.category : ButtonStyle.tag)}
        >
          {type === "category" ? tagName : `# ${tagName}`}
        </CustomTypography>
      </Button>
    </div>
  )
}
