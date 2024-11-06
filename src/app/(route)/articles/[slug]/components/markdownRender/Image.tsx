/* eslint-disable import/no-named-default */
import { default as NextImage } from "next/image"

type ImageProps = {
  src: string
  alt: string
}

export default function Image({ src, alt }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "8px",
        margin: "16px 0",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
      }}
    />
  )
}
