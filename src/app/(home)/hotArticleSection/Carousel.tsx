"use client"

import React from "react"
import BlurImage from "@/app/components/common/BlurImage"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules"
import { Box } from "@mui/material"
import { NotionData } from "types"

import "./styles.css"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import CustomTypography from "@/app/components/common/CustomTypography"
import Link from "next/link"

type CarouselProps = {
  data: NotionData[]
}

export default function Carousel({ data }: CarouselProps) {
  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 5000 }}
      loop
      modules={[Pagination, Navigation, Autoplay, A11y]}
    >
      {data.map((item: NotionData) => (
        <SwiperSlide key={item.id}>
          <Link href={`/articles/${item.slug}`}>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                alignItems: "center",
                justifyContent: "center",
                padding: {
                  xs: "20px 34px 40px 34px",
                  sm: "40px 40px 60px 40px",
                },
                gap: { xs: 1, sm: 5 },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <BlurImage
                  src={item.thumbnail}
                  blurDataURL={item.thumbnail}
                  imageStyle={{
                    borderRadius: "8px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: { xs: 1, sm: 2 },
                  width: "100%",
                  height: "100%",
                }}
              >
                <CustomTypography
                  color="black"
                  weight={600}
                  sx={{
                    fontSize: { xs: 18, sm: 20, md: 22, lg: 24 },
                  }}
                >
                  {item.title}
                </CustomTypography>
                <CustomTypography
                  sx={{
                    fontSize: { xs: 13, sm: 14, md: 16, lg: 18 },
                  }}
                  color="var(--gray)"
                >
                  {item.description}
                </CustomTypography>
              </Box>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
