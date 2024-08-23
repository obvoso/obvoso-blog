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
      // weight: isSelected ? 700 : 300,
    },
    category: {
      color: isSelected ? "var(--primary)" : "var(--text-secondary)",
      weight: 600,
      size: 13,
    },
  }

  const handleClick = () => {
    setTag({ tagName, type })
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        sx={{ paddingX: "0px", justifyContent: "left" }}
      >
        <CustomTypography
          {...(type === "category" ? ButtonStyle.category : ButtonStyle.tag)}
        >
          {type === "category" ? `# ${tagName}` : tagName}
        </CustomTypography>
      </Button>
    </div>
  )
}
