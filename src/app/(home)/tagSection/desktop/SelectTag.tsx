import { TagEnum } from "@/types/tags"

import Box from "@mui/material/Box"
import Tag from "../Tag"
import IndexSectionTag from "./IndexSectionTag"

type SelectTagsProps = {
  data: string[]
}

export default function SelectTag({ data }: SelectTagsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingX: 3,
        gap: 2,
        background: "var(--silver-gradient)",
        borderRadius: "10px 10px 0px 0px",
        border: "1px solid var(--border)",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
      }}
    >
      {data.map((tag) => (
        <Tag key={tag} tagName={tag} type={TagEnum.TAG}>
          {({ isSelected, onClick }) => (
            <IndexSectionTag
              tagName={tag}
              isSelected={isSelected}
              onClick={onClick}
            />
          )}
        </Tag>
      ))}
    </Box>
  )
}
