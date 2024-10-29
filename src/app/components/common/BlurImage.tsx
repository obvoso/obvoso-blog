"use client"

import { Box } from "@mui/material"
import Image, { type ImageProps } from "next/image"
import { forwardRef, type ForwardedRef } from "react"

interface BlurImageProps extends 
Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  blurDataURL?: ImageProps['blurDataURL'],
  ratio?: string,
  imageStyle?: React.CSSProperties
}

export const BlurImage = forwardRef(
  ({ ratio = "56.26%", imageStyle, ...props }: BlurImageProps, ref: ForwardedRef<HTMLImageElement>) => {
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
        {...props}
        height={0}
        width={0}
        sizes="100vw"
        placeholder="blur"
        fill
        style={{
          objectFit: "cover",
          ...imageStyle,
        }}
      />
    </Box>
  )
}
)
