"use client"

import { Box } from "@mui/material"
import { RecoilRoot } from "recoil"
import TagVerticalNavigation from "../layout/TagVerticalNavigation"
import Articles from "./Articles"

export default function Test({
  initialCategories,
  initialPosts,
}: {
  initialCategories: any
  initialPosts: any
}) {
  return (
    <RecoilRoot>
      <Box
        component="main"
        sx={{ p: 20, display: "flex", flexDirection: "row" }}
      >
        <TagVerticalNavigation initialCategories={initialCategories} />
        <Box sx={{ px: 20 }}>
          <Articles initialPosts={initialPosts} />
        </Box>
      </Box>
    </RecoilRoot>
  )
}
