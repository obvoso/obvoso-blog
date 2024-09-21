import DesktopJukebox from "@/app/(home)/profileSection/desktop/component/DesktopZukebox"
import CustomBox from "@/app/components/common/CustomBox"
import Avatar from "./component/Avatar"
import Introduce from "./component/Introduce"

export default function DesktopSideProfile() {
  return (
    <CustomBox
      sx={{ display: "flex", flexDirection: "column", paddingTop: 4, gap: 3 }}
    >
      <Avatar />
      <Introduce />
      <DesktopJukebox />
    </CustomBox>
  )
}
