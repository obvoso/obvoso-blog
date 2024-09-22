"use client"

import CustomBox from "@/app/components/common/CustomBox"
import CustomTypography from "@/app/components/common/CustomTypography"
import StarTextBox from "@/app/components/common/StarTextBox"
import cd from "@/assets/images/cd.png"
import { playlistInfo } from "@/lib/utils/playlist"
import { Box } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube"
import ControlButtons from "./jukebox/ControlButtons"
import PlaylistInfo from "./jukebox/PlaylistInfo"
import Volume from "./jukebox/Volume"

const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID

export default function DesktopJukebox() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [volume, setVolume] = useState<number>(50)
  const [currentTrack, setCurrentTrack] = useState<number>(0)

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target)
    event.target.setVolume(volume)
  }

  const onStateChange = (event: { target: YouTubePlayer; data: number }) => {
    if (event.data === 1) {
      const currentIndex = event.target.getPlaylistIndex()
      if (currentIndex !== currentTrack) setCurrentTrack(currentIndex)
    }
  }

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleNext = () => {
    if (player) {
      player.nextVideo()
      setCurrentTrack((prev) => (prev + 1) % playlistInfo.length)
      if (!isPlaying) {
        setIsPlaying(!isPlaying)
      }
    }
  }

  const handlePrevious = () => {
    if (player) {
      player.previousVideo()
      setCurrentTrack(
        (prev) => (prev - 1 + playlistInfo.length) % playlistInfo.length,
      )
      if (!isPlaying) {
        setIsPlaying(!isPlaying)
      }
    }
  }

  const handleReplay = () => {
    if (player) {
      player.seekTo(0)
    }
  }

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    if (player) {
      const volumeValue = Array.isArray(newValue) ? newValue[0] : newValue
      setVolume(volumeValue)
      player.setVolume(volumeValue)
    }
  }

  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      listType: "playlist",
      list: PLAYLIST_ID,
      autoplay: 1,
      controls: 0,
      loop: 1,
      rel: 0,
    },
  }

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
    </CustomBox>
  )
}
