import {
  currentTrackState,
  isPlayingState,
  playerState,
  volumeState,
} from "@/atoms/playlist"
import { playlist } from "@/lib/utils/playlist"
import { cloneDeep } from "lodash"
import { YouTubePlayer, YouTubeProps } from "react-youtube"
import { useRecoilState } from "recoil"

const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID

export default function usePlaylist() {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [player, setPlayer] = useRecoilState(playerState)
  const [volume, setVolume] = useRecoilState(volumeState)
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState)

  const onReady = (event: { target: YouTubePlayer }) => {
    event.target.setVolume(volume)
    const deepCopyPlayer = cloneDeep(event.target)
    setPlayer(deepCopyPlayer)
  }

  const onStateChange = (event: { target: YouTubePlayer; data: number }) => {
    if (event.data === 1) {
      setIsPlaying(true)
      const currentIndex = event.target.getPlaylistIndex()
      if (currentIndex !== currentTrack) setCurrentTrack(currentIndex)
    }
    if (event.data === 2) {
      setIsPlaying(false)
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
      setCurrentTrack((prev) => (prev + 1) % playlist.length)
      if (!isPlaying) {
        setIsPlaying(!isPlaying)
      }
    }
  }

  const handlePrevious = () => {
    if (player) {
      player.previousVideo()
      setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
      if (!isPlaying) {
        setIsPlaying(!isPlaying)
      }
    }
  }

  const handleVideoAt = (index: number) => {
    if (player) {
      player.playVideoAt(index)
      setCurrentTrack(index)
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
      autoplay: 0,
      controls: 1,
      loop: 1,
    },
  }
  return {
    isPlaying,
    setIsPlaying,
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
    handleVideoAt,
    opts,
  }
}
