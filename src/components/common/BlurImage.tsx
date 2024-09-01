import { Box } from "@mui/material"
import Image from "next/image"

type BlurImageProps = {
  src: string
  blurDataURL: string
  ratio?: string
}

export default function BlurImage({
  src,
  blurDataURL,
  ratio = "56.26%",
}: BlurImageProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingBottom: ratio,
        backgroundColor: "var(--primary)",
      }}
    >
      <Image
        src={src}
        alt="thumbnail"
        // placeholder="blur"
        // blurDataURL={blurDataURL}
        width={0}
        height={0}
        sizes="100vw"
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </Box>
  )
}
