"use client"

import { CategoryTag, TagEnum } from "@/types/tags"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import Collapse from "@mui/material/Collapse"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { useState } from "react"
import { Button } from "@mui/material"
import Tag from "../Tag"

type SidebarProps = {
  data: CategoryTag[]
}

function Sidebar({ data }: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  )

  const handleToggle = (categoryName: string) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }))
  }

  return (
    <List
      sx={{
        padding: 2,
        display: { xs: "none", sm: "flex" },
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      {data.map((category) => (
        <div key={category.name}>
          <ListItem>
            <Tag tagName={category.name} type={TagEnum.CATEGORY} />
            {category.name !== "전체보기" && (
              <Button
                disableRipple
                onClick={() => handleToggle(category.name)}
                sx={{
                  cursor: "pointer",
                  color: "var(--text)",
                  "&:hover": { backgroundColor: "var(--background)" },
                }}
              >
                {openCategories[category.name] ? (
                  <ExpandLess sx={{ fontSize: 15 }} />
                ) : (
                  <ExpandMore sx={{ fontSize: 15 }} />
                )}
              </Button>
            )}
          </ListItem>
          <Collapse
            in={openCategories[category.name]}
            timeout="auto"
            unmountOnExit
          >
            {category.tags.map((tag) => (
              <ListItem key={tag} sx={{ pl: 4 }}>
                <Tag tagName={tag} type={TagEnum.TAG} />
              </ListItem>
            ))}
          </Collapse>
        </div>
      ))}
    </List>
  )
}

export default Sidebar
