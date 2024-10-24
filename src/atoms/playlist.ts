import { YouTubePlayer } from "react-youtube"
import { atom } from "recoil"

export const isPlayingState = atom<boolean>({
  key: "isPlayingState",
  default: false,
})

export const playerState = atom<YouTubePlayer | null>({
  key: "playerState",
  default: null,
})

export const volumeState = atom<number>({
  key: "volumeState",
  default: 50,
})

export const currentTrackState = atom<number>({
  key: "currentTrackState",
  default: 0,
})
