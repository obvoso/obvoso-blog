import CustomTypography from "@/app/components/common/CustomTypography"
import { Button } from "@mui/material"

type IndexSectionTagProps = {
  tagName: string
  isSelected: boolean
  onClick: () => void
}

export default function IndexSectionTag({
  tagName,
  isSelected,
  onClick,
}: IndexSectionTagProps) {
  return (
    <Button onClick={onClick} sx={{ minWidth: 0 }}>
      <CustomTypography
        size={15}
        color={isSelected ? "black" : "var(--gray)"}
        sx={{
          cursor: "pointer",
        }}
      >
        {tagName}
      </CustomTypography>
    </Button>
  )
}
