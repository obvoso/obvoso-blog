"use client"

import CustomTypography from "@/app/components/common/CustomTypography"
import GradientBox from "@/app/components/common/GradientBox"
import { CategoryTag, TagEnum } from "@/types/tags"
import { Box } from "@mui/material"
import React from "react"
import Tag from "../Tag"

type ButtonTagProps = {
  tagName: string
  isSelected: boolean
  onClick: () => void
}

function ButtonTag({ tagName, isSelected, onClick }: ButtonTagProps) {
  return (
    <GradientBox type="button" isSelected={isSelected} onClick={onClick}>
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

type MobileTagsProps = {
  tags: CategoryTag[]
}

export default function MobileTags({ tags }: MobileTagsProps) {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        padding: 4,
      }}
    >
      {tags.map((category) => (
        <React.Fragment key={category.name}>
          <Tag tagName={category.name} type={TagEnum.CATEGORY}>
            {({ isSelected, onClick }) => (
              <ButtonTag
                tagName={category.name}
                isSelected={isSelected}
                onClick={onClick}
              />
            )}
          </Tag>
          {category.tags.map((tag) => (
            <Tag key={tag} tagName={tag} type={TagEnum.TAG}>
              {({ isSelected, onClick }) => (
                <ButtonTag
                  tagName={tag}
                  isSelected={isSelected}
                  onClick={onClick}
                />
              )}
            </Tag>
          ))}
        </React.Fragment>
      ))}
    </Box>
  )
}
