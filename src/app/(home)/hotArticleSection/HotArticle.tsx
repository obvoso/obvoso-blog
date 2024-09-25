import { getHotArticle } from "@/lib/api/article"
import Carousel from "./Carousel"
import "./styles.css"
import CustomBox from "@/app/components/common/CustomBox"
import StarTextBox from "@/app/components/common/StarTextBox"
import { Box } from "@mui/material"

export default async function HotArticle() {
  const data = await getHotArticle()

  return (
    <div className="container">
      <CustomBox
        sx={{
          borderRadius: "8px 8px 16px 16px ",
          padding: 0,
        }}
      >
        <StarTextBox text="Hot Article Headlines" />
        <Box
          sx={{
            display: "grid",
            position: "relative",
            maxWidth: "100%",
            borderRadius: 2,
            boxShadow:
              "inset 0px 2px 4px rgba(0, 0, 0, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.3)",
            margin: 4,
            background: "var(--primary-gradient)",
          }}
        >
          <Carousel data={data} />
        </Box>
      </CustomBox>
    </div>
  )
}
