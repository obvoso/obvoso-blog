"use client"

import { Box } from "@mui/material"
import Image from "next/image"

type BlurImageProps = {
  src: string
  blurDataURL: string
  ratio?: string
  imageStyle?: React.CSSProperties
  className?: string
}

export default function BlurImage({
  src,
  blurDataURL,
  ratio = "56.26%",
  imageStyle,
  className,
}: BlurImageProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingBottom: ratio,
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt="thumbnail"
        placeholder="blur"
        blurDataURL={blurDataURL}
        width={0}
        height={0}
        sizes="100vw"
        fill
        className={className}
        style={{
          objectFit: "cover",
          ...imageStyle,
        }}
      />
    </Box>
  )
}
