import CustomBox from "@/app/components/common/CustomBox"
import Jukebox from "@/app/components/layout/Zukebox"
import Avatar from "./component/Avatar"
import Introduce from "./component/Introduce"

export default function DesktopSideProfile() {
  return (
    <CustomBox
      sx={{ display: "flex", flexDirection: "column", paddingTop: 4, gap: 3 }}
    >
      <Avatar />
      <Introduce />
      <Jukebox />
    </CustomBox>
  )
}
