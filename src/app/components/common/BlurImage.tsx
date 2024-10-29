"use client"

import { Box } from "@mui/material"
import Image from "next/image"

type BlurImageProps = {
  src: string
  blurDataURL: string
  ratio?: string
  imageStyle?: React.CSSProperties
}

export default function BlurImage({
  src,
  blurDataURL,
  ratio = "56.26%",
  imageStyle,
}: BlurImageProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingBottom: ratio,
        background: "var(--primary)",
      }}
    >
      <Image
        src={`${src}?_test`}
        alt="thumbnail"
        placeholder="blur"
        blurDataURL={blurDataURL}
        width={1200}
        height={500}
       // sizes="100vw"
        fill
        style={{
          objectFit: "cover",
          ...imageStyle,
        }}
      />
    </Box>
  )
}
