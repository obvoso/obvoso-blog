"use client"

import React, { useEffect, useState } from "react"
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material"
import { PlayArrow, Pause } from "@mui/icons-material"
import CustomTypography from "../common/CustomTypography"

declare global {
  interface Window {
    YT: {
      Player: {
        new (id: string, options: object): any
      }
    }
    onYouTubeIframeAPIReady: { (): void } | null
  }
}

const YOUTUBE_ID = process.env.NEXT_PUBLIC_YOUTUBE_ID

const songInfo = {
  videoId: YOUTUBE_ID,
  title: "𝜗𝜚 ｡˚゜ʷᵒʳᵏ ʰᵃʳᵈ ໒ྀི ₊˚⊹",
  artist: " ₊ᵉᶰᶳᵉᵐᵇˡᵉ ᶳᵗᵃʳᶳ ᵎᵎ",
}

export default function AudioHeader() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<any>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(script)

    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player("player", {
        videoId: songInfo.videoId,
        events: {
          onReady: () => {
            setPlayer(ytPlayer)
          },
        },
        playerVars: {
          loop: 1,
          playlist: songInfo.videoId,
        },
      })
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) player.pauseVideo()
      else {
        player.playVideo()
      }

      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handlePlayPause} sx={{ color: "var(--primary)" }}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <Box
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: { xs: "120px", sm: "150px", md: "250px" },
          }}
        >
          <CustomTypography
            sx={{
              color: "var(--primary)",
              display: "inline-block",
              animation: isPlaying ? "scroll-text 10s linear infinite" : "none",
            }}
          >
            {`${songInfo.title} - ${songInfo.artist}`}
          </CustomTypography>
        </Box>
      </Box>
      <div id="player" style={{ display: "none" }} />
    </>
  )
}
