import CustomBox from "@/app/components/common/CustomBox"
import ThemeToggle from "@/app/components/common/ThemeToggle"
import Avatar from "./component/Avatar"
import DesktopJukebox from "./component/DesktopZukebox"
import Introduce from "./component/Introduce"

export default function DesktopSideProfile() {
  return (
    <CustomBox
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        backgroundColor: "var(--background-opacity)",
        flexDirection: "column",
        paddingTop: 4,
        gap: 3,
        height: "fit-content",
        position: "sticky",
        top: 50,
      }}
    >
      <Avatar />
      <Introduce />
      <DesktopJukebox />
      <ThemeToggle />
    </CustomBox>
  )
}
