import { useState } from "react"

export default function useShowPlaylist() {
  const [showPlayList, setShowPlayList] = useState(false)

  const handleShowPlayList = () => {
    setShowPlayList(!showPlayList)
  }

  return { showPlayList, handleShowPlayList }
}
