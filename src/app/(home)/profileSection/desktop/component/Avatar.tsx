import CustomBox from "@/app/components/common/CustomBox"
import avatar from "@/assets/images/avatar.webp"
import { Box } from "@mui/material"
import Image from "next/image"

export default function Avatar() {
  return (
    <CustomBox
      sx={{
        padding: 1.5,
        background: "var(--silver-gradient)",
      }}
    >
      <Box
        sx={{
          boxShadow: "inset 0 5px 5px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: 6.5,
          position: "relative",
          width: "100%",
          paddingBottom: "100%",
          background: "var(--primary-gradient)",
        }}
      >
        <Image
          src={avatar}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vw"
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </Box>
    </CustomBox>
  )
}
