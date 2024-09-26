"use client"

import CustomBox from "@/app/components/common/CustomBox"
import CustomTypography from "@/app/components/common/CustomTypography"
import StarTextBox from "@/app/components/common/StarTextBox"
import cd from "@/assets/images/cd.png"
import usePlaylist from "@/hooks/usePlaylist"
import { playlistInfo } from "@/lib/utils/playlist"
import { Box } from "@mui/material"
import Image from "next/image"
import ControlButtons from "./jukebox/ControlButtons"
import PlaylistInfo from "./jukebox/PlaylistInfo"
import Volume from "./jukebox/Volume"

export default function DesktopJukebox() {
  const {
    isPlaying,
    volume,
    currentTrack,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleReplay,
    handleVolumeChange,
  } = usePlaylist()

  return (
    <CustomBox sx={{ borderRadius: "8px 8px 16px 16px ", padding: 0 }}>
      <StarTextBox text="Jukebox" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 0.5,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "30px",
            boxShadow: "3px 4px 7px rgba(0, 0, 0, 0.3)",
            padding: "5px 10px 10px 10px",
            background: "var(--silver-gradient)",
            border: "1px solid var(--border)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginLeft: 2,
              alignItems: "center",
              gap: 1,
              paddingY: 0.2,
            }}
          >
            <Image src={cd} alt="cd" width={20} height={20} />
            <CustomTypography size={12} weight={500} color={"var(--tertiary)"}>
              media player
            </CustomTypography>
          </Box>
          <Box
            sx={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "80px / 60px",
              background: "var(--silver-gradient)",
              padding: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "80px / 60px",
                background: "var(--silver-gradient)",
                padding: 1,
                gap: 0.5,
              }}
            >
              <ControlButtons
                handlePlayPause={handlePlayPause}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                handleReplay={handleReplay}
                isPlaying={isPlaying}
              />
              <Box
                sx={{
                  position: "relative",
                  flexDirection: "column",
                }}
              >
                <PlaylistInfo
                  info={playlistInfo[currentTrack]}
                  isPlaying={isPlaying}
                />
                <Volume value={volume} onChange={handleVolumeChange} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomBox>
  )
}
