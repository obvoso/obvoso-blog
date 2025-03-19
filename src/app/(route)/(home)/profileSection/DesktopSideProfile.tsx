import CustomBox from "@/app/components/common/CustomBox"
import ThemeToggle from "@/app/components/common/ThemeToggle"
import { Box } from "@mui/material"
import Avatar from "./component/Avatar"
import DesktopJukebox from "./component/DesktopZukebox"
import Introduce from "./component/Introduce"

export default function DesktopSideProfile() {
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          lg: "flex",
        },
        position: "sticky",
        top: 50,
        maxHeight: "min(700px, calc(100vh - 50px))",
        overflowY: "auto",
        minWidth: "330px",
        justifyContent: "center",
      }}
    >
      <CustomBox
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "var(--background-opacity)",
          padding: 3,
          height: "fit-content",
        }}
      >
        <Avatar />
        <Introduce />
        <DesktopJukebox />
        <ThemeToggle scale={0.8} />
      </CustomBox>
    </Box>
  )
}
