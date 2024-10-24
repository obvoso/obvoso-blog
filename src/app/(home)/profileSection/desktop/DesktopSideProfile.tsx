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
        backgroundColor: "var(--background-opacity)",
        flexDirection: "column",
        paddingTop: 4,
        gap: 3,
        height: "fit-content",
        /* 고정시킬지 말지 고민중 */
        // height: "100%"
        // "@media (max-height: 1080px)": {
        //   height: "fit-content",
        // },
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
