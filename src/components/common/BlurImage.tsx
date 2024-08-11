import { Box } from "@mui/material"
import Image from "next/image"

type BlurImageProps = {
  src: string
  blurDataURL: string
}

export default function BlurImage({ src, blurDataURL }: BlurImageProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.26%",
        backgroundColor: "var(--primary)",
      }}
    >
      <Image
        src={src}
        alt="thumbnail"
        placeholder={"blur"}
        blurDataURL={blurDataURL}
        width={0}
        height={0}
        sizes="100vw"
        fill
        style={{
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />
    </Box>
  )
}
