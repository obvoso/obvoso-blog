"use client"

import usePlaylist from "@/hooks/usePlaylist"
import React from "react"
import YouTube from "react-youtube"
import { playlistInfo } from "@/lib/utils/playlist"
import { AddBoxSharp, Pause, PlayArrow } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import CustomTypography from "@/app/components/common/CustomTypography"
import GradientBox from "@/app/components/common/GradientBox"

export default function MobileZukebox() {
  const { isPlaying, currentTrack, onReady, handlePlayPause, opts } =
    usePlaylist()
  const { title, artist } = playlistInfo[currentTrack]
  return (
    <GradientBox type={"box"}>
      <Box
        sx={{
          display: "flex",
          width: "20vw",
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
        <YouTube
          videoId=""
          opts={opts}
          onReady={onReady}
          style={{
            display: "none",
          }}
        />
      </Box>
    </GradientBox>
  )
}
