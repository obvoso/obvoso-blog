"use client"

import { CategoryTag, TagEnum } from "@/types/tags"
import { Box, ListItem } from "@mui/material"
import List from "@mui/material/List"
import { useState } from "react"
import Tag from "../Tag"
import IndexSectionTag from "./IndexSectionTag"
import SelectTag from "./SelectTag"

/**
 * @description 배열 크기 커지면 인덱스 시그니처로 변경 고려해야됨.. 탐색 오래걸릴수도 있음
 */
type SelectCategoryProps = {
  data: CategoryTag[]
}

function SelectCategory({ data }: SelectCategoryProps) {
  const [openCategories, setOpenCategories] = useState<string>("전체보기")

  const handleToggle = (categoryName: string) => {
    setOpenCategories(categoryName)
  }

  const selectedTags =
    openCategories === "전체보기"
      ? data.flatMap((category) => category.tags)
      : data.find((category) => category.name === openCategories)?.tags || []

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        width: "100%",
        marginTop: 4,
        flexDirection: "column",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginLeft: 4,
          paddingBottom: 0,
        }}
      >
        {data.map((category) => (
          <ListItem
            key={category.name}
            onClick={() => handleToggle(category.name)}
            sx={{
              background: "var(--silver-gradient)",
              borderRadius: "10px 10px 0px 0px",
              border: "1px solid var(--border)",
              borderBottom:
                openCategories === category.name
                  ? "none"
                  : "1px solid var(--border)",
              width: "fit-content",
              padding: "0px 10px",
              marginBottom: "-1.5px",
              zIndex: openCategories === category.name ? 1 : "auto",
            }}
          >
            <Tag tagName={category.name} type={TagEnum.CATEGORY}>
              {({ isSelected, onClick }) => (
                <IndexSectionTag
                  tagName={category.name}
                  isSelected={isSelected}
                  onClick={onClick}
                />
              )}
            </Tag>
          </ListItem>
        ))}
      </List>
      <SelectTag data={selectedTags} />
    </Box>
  )
}

export default SelectCategory
