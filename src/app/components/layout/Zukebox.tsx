"use client"

import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeDown,
  VolumeUp,
} from "@mui/icons-material"
import { Box, IconButton, Slider } from "@mui/material"
import { useState } from "react"
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube"

const PLAYLIST_ID = "RDlhhV41VL0BU" // 여기에 유튜브 재생목록 ID 입력

export default function Jukebox() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [volume, setVolume] = useState<number>(50) // 초기 음량 설정

  // YouTube player가 준비되었을 때 호출되는 함수
  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target) // YouTube player 객체를 저장
    event.target.setVolume(volume) // 초기 음량 설정
  }

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo() // 비디오 일시정지
      } else {
        player.playVideo() // 비디오 재생
      }
      setIsPlaying(!isPlaying) // 재생 상태 변경
    }
  }

  const handleNext = () => {
    if (player) {
      player.nextVideo() // 다음 곡으로 이동
    }
  }

  const handlePrevious = () => {
    if (player) {
      player.previousVideo() // 이전 곡으로 이동
    }
  }

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    if (player) {
      const volumeValue = Array.isArray(newValue) ? newValue[0] : newValue
      setVolume(volumeValue) // 음량 상태 업데이트
      player.setVolume(volumeValue) // 유튜브 플레이어의 음량 조절
    }
  }

  const opts: YouTubeProps["opts"] = {
    height: "0", // 비디오 화면 숨기기
    width: "0",
    playerVars: {
      listType: "playlist", // 재생목록 타입
      list: PLAYLIST_ID, // 재생목록 ID
      autoplay: 1, // 자동 재생
      controls: 0, // 유튜브 플레이어의 기본 컨트롤 숨기기
      loop: 1, // 재생목록 반복 재생
    },
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* 재생 제어 버튼 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={handlePrevious}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handleNext}>
          <SkipNext />
        </IconButton>
      </Box>

      {/* 음량 조절 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <VolumeDown />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          aria-labelledby="volume-slider"
          min={0}
          max={100}
          sx={{ width: 200 }}
        />
        <VolumeUp />
      </Box>

      {/* 유튜브 플레이어 */}
      <YouTube videoId="" opts={opts} onReady={onReady} />
    </Box>
  )
}
