"use client"

import CustomTypography from "@/app/components/common/CustomTypography"
import GradientBox from "@/app/components/common/GradientBox"
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
    <GradientBox type={"button"} onClick={handleClick} isSelected={isSelected}>
      <CustomTypography
        size={12}
        color="white"
        sx={{
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
        }}
      >
        {tagName}
      </CustomTypography>
    </GradientBox>
  )
}
