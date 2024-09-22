import CustomTypography from "@/app/components/common/CustomTypography"
import star from "@/assets/images/star.svg"
import { Box } from "@mui/material"
import Image from "next/image"

type StarTextBoxProps = {
  text: string
}
export default function StarTextBox({ text }: StarTextBoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        background: "var(--silver-gradient)",
        borderBottom: "2px solid var(--border-tertiary)",
        borderRadius: "8px",
        paddingX: 2,
        gap: 1,
      }}
    >
      <Image src={star} alt="star" width={24} height={24} />
      <CustomTypography size={20} color="var(--gray)">
        {text}
      </CustomTypography>
    </Box>
  )
}
