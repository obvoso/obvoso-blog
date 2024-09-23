import {
  isPlayingState,
  playerState,
  volumeState,
  currentTrackState,
} from "@/atoms/playlist"
import { playlistInfo } from "@/lib/utils/playlist"
import React from "react"
import { YouTubePlayer, YouTubeProps } from "react-youtube"
import { useRecoilState } from "recoil"

const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID

export default function usePlaylist() {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [player, setPlayer] = useRecoilState(playerState)
  const [volume, setVolume] = useRecoilState(volumeState)
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState)

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
  return {
    isPlaying,
    setIsPlaying,
    player,
    setPlayer,
    volume,
    setVolume,
    currentTrack,
    setCurrentTrack,
    onReady,
    onStateChange,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleReplay,
    handleVolumeChange,
    opts,
  }
}
