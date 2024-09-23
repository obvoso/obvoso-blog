import { Playlist } from "@/types/playlist"
import { YouTubePlayer } from "react-youtube"
import { atom, selector } from "recoil"

export const playlistState = atom<Playlist>({
  key: "playlistState",
  default: {
    isPlaying: false,
    player: null,
    volume: 50,
    currentTrack: 0,
  },
})

export const isPlayingState = selector<boolean>({
  key: "isPlayingState",
  get: ({ get }) => {
    const playlist = get(playlistState)
    return playlist.isPlaying
  },
  set: ({ set, get }, newValue) => {
    const playlist = get(playlistState)
    set(playlistState, {
      ...playlist,
      isPlaying: newValue as boolean,
    })
  },
})

export const playerState = selector<YouTubePlayer | null>({
  key: "playerState",
  get: ({ get }) => {
    const playlist = get(playlistState)
    return playlist.player
  },
  set: ({ set, get }, newValue) => {
    const playlist = get(playlistState)
    set(playlistState, {
      ...playlist,
      player: newValue as YouTubePlayer | null,
    })
  },
})

export const volumeState = selector<number>({
  key: "volumeState",
  get: ({ get }) => {
    const playlist = get(playlistState)
    return playlist.volume
  },
  set: ({ set, get }, newValue) => {
    const playlist = get(playlistState)
    set(playlistState, {
      ...playlist,
      volume: newValue as number,
    })
  },
})

export const currentTrackState = selector<number>({
  key: "currentTrackState",
  get: ({ get }) => {
    const playlist = get(playlistState)
    return playlist.currentTrack
  },
  set: ({ set, get }, newValue) => {
    const playlist = get(playlistState)
    set(playlistState, {
      ...playlist,
      currentTrack: newValue as number,
    })
  },
})
