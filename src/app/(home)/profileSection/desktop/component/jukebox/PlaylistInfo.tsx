import CustomTypography from "@/app/components/common/CustomTypography"
import { PlayListInfo } from "@/lib/utils/playlist"
import { Box } from "@mui/material"

type PlaylistInfoProps = {
  info: PlayListInfo
  isPlaying: boolean
}
export default function PlaylistInfo({ info, isPlaying }: PlaylistInfoProps) {
  const { title, artist } = info
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "120px",
        height: "fit-content",
        background: "var(--primary-gradient)",
        borderRadius: "50% / 20% 50% 50% 20%",
        color: "white",
        padding: "24px 5px",
        boxShadow: "inset 0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <CustomTypography
          sx={{
            color: "var(--border-tertiatry)",
            display: "inline-block",
            animation: isPlaying ? "scroll-text 10s linear infinite" : "none",
          }}
        >
          {`${title} - ${artist}`}
        </CustomTypography>
      </Box>
    </Box>
  )
}
