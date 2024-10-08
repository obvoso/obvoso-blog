"use client"
import CustomBox from "@/app/components/common/CustomBox"
import CustomTypography from "@/app/components/common/CustomTypography"
import StarTextBox from "@/app/components/common/StarTextBox"
import { NotionData } from "@/types/notion"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { Box } from "@mui/material"
import Link from "next/link"
import "./articleNavigationCard.style.css"

type ArticleNavitationCardProps = NotionData & {
  cardType: "이전 포스트" | "다음 포스트"
}

export default function ArticleNavigationCard({
  title,
  slug,
  description,
  createdTime,
  cardType,
}: ArticleNavitationCardProps) {
  return (
    <CustomBox
      sx={{
        flex: 1,
        width: "100%",
        padding: 0,
        borderRadius: "8px 8px 16px 16px",
        flexBasis: "50%",
        maxWidth: {
          xs: "100%",
          sm: "50%",
        },
        alignSelf: cardType === "이전 포스트" ? "flex-start" : "flex-end",
        "&:hover .cardNavigationButton": {
          animation:
            (cardType === "이전 포스트" ? "moveLeft" : "moveRight") +
            " 0.5s ease-in-out",
        },
      }}
    >
      <Link href={`/articles/${slug}`}>
        <StarTextBox text={cardType} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: cardType === "이전 포스트" ? "row-reverse" : "row",
            width: "100%",
            gap: 4,
            paddingX: 2,
          }}
        >
          <Box
            paddingY={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
              textAlign: cardType === "이전 포스트" ? "left" : "right",
            }}
          >
            <CustomTypography
              weight={600}
              size={18}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {title}
            </CustomTypography>
            <CustomTypography
              size={16}
              color={"var(--text-secondary)"}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {description}
            </CustomTypography>
            <CustomTypography color={"var(--text-tertiatry)"}>
              {createdTime}
            </CustomTypography>
          </Box>

          <Box
            className="cardNavigationButton"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
              borderRadius: "50%",
              border: "1px solid var(--primary)",
              cursor: "pointer",
            }}
          >
            {cardType === "이전 포스트" ? (
              <ArrowBackIcon sx={{ color: "var(--primary)" }} />
            ) : (
              <ArrowForwardIcon sx={{ color: "var(--primary)" }} />
            )}
          </Box>
        </Box>
      </Link>
    </CustomBox>
  )
}
