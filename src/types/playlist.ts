import { YouTubePlayer } from "react-youtube"

export type Playlist = {
  isPlaying: boolean
  player: YouTubePlayer | null
  volume: number
  currentTrack: number
}

export type PlayListInfo = {
  title: string
  artist: string
  time: string
}
