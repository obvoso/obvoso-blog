import DesktopJukebox from "@/app/(home)/profileSection/desktop/component/DesktopZukebox"
import CustomBox from "@/app/components/common/CustomBox"
import ThemeToggle from "@/app/components/layout/ThemeToggle"
import Avatar from "./component/Avatar"
import Introduce from "./component/Introduce"

export default function DesktopSideProfile() {
  return (
    <CustomBox
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
        paddingTop: 4,
        gap: 3,
        minHeight: "894px",
      }}
    >
      <Avatar />
      <Introduce />
      <DesktopJukebox />
      <ThemeToggle />
    </CustomBox>
  )
}
