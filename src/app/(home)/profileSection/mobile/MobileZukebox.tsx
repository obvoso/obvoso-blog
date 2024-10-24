"use client"

import CustomTypography from "@/app/components/common/CustomTypography"
import GradientBox from "@/app/components/common/GradientBox"
import cd from "@/assets/images/cd.png"
import usePlaylist from "@/hooks/usePlaylist"
import useShowPlaylist from "@/hooks/useShowPlaylist"
import { playlist } from "@/lib/utils/playlist"
import { Pause, PlayArrow } from "@mui/icons-material"
import { Box, IconButton, Tooltip } from "@mui/material"
import Image from "next/image"
import YouTube from "react-youtube"
import Playlist from "../desktop/component/jukebox/Playlist"

export default function MobileZukebox() {
  const {
    isPlaying,
    currentTrack,
    onReady,
    onStateChange,
    handlePlayPause,
    handleVideoAt,
    opts,
  } = usePlaylist()
  const { showPlayList, handleShowPlayList } = useShowPlaylist()
  const { title, artist } = playlist[currentTrack]

  return (
    <GradientBox type="box">
      <Box
        sx={{
          display: "flex",
          maxWidth: "30vw",
          alignItems: "center",
          padding: "0px 5px",
          gap: 0.5,
        }}
      >
        <IconButton
          onClick={handlePlayPause}
          sx={{
            padding: 0,
          }}
        >
          {isPlaying ? (
            <Pause fontSize="medium" />
          ) : (
            <PlayArrow fontSize="medium" />
          )}
        </IconButton>
        <Box
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <CustomTypography
            sx={{
              color: "var(--gray)",
              display: "inline-block",
              animation: isPlaying ? "scroll-text 10s linear infinite" : "none",
            }}
          >
            {`${title} - ${artist}`}
          </CustomTypography>
        </Box>
        <Tooltip title="Show Playlist">
          <Image
            src={cd}
            alt="cd"
            width={20}
            height={20}
            onClick={handleShowPlayList}
          />
        </Tooltip>
        <YouTube
          videoId=""
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          style={{
            display: "none",
          }}
        />
      </Box>
      <Playlist
        open={showPlayList}
        handleClose={handleShowPlayList}
        handleVideoAt={handleVideoAt}
        currentTrack={currentTrack}
      />
    </GradientBox>
  )
}
