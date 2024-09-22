import { Pause, PlayArrow, SkipNext } from "@mui/icons-material"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import { Box, IconButton } from "@mui/material"

type CircularButtonProps = {
  transform: number
  children?: React.ReactNode
}

function CircularButton({ transform, children }: CircularButtonProps) {
  const clipPath = "polygon(50% 50%, 100% 0, 100% 100%)"
  return (
    <Box
      component="button"
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "var(--silver-gradient)",
        clipPath,
        transform: `rotate(${transform}deg)`,
        border: "none",
        boxShadow: "inset 2px 4px 7px rgba(0, 0, 0, 0.3)",
        borderRadius: "50%",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 0.2,
          color: "var(--gray)",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

type ControlButtonsProps = {
  handlePlayPause: () => void
  handlePrevious: () => void
  handleNext: () => void
  handleReplay: () => void
  isPlaying: boolean
}
export default function ControlButtons({
  handlePlayPause,
  handlePrevious,
  handleNext,
  handleReplay,
  isPlaying,
}: ControlButtonsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--silver-gradient)",
        borderRadius: "50%",
        boxShadow: `
        inset 2px 4px 7px rgba(0, 0, 0, 0.3), 
        1px 0px 2px rgba(0, 0, 0, 0.3) 
      `,
        padding: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 70,
          height: 70,
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            position: "absolute",
            width: "50%",
            height: "50%",
            top: "25%",
            left: "25%",
            background: "var(--silver-gradient)",
            borderRadius: "50%",
            boxShadow: "inset 2px 4px 7px rgba(0, 0, 0, 0.3)",
            border: "none",
          }}
        >
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? (
              <Pause fontSize="medium" />
            ) : (
              <PlayArrow fontSize="medium" />
            )}
          </IconButton>
        </Box>
        <CircularButton transform={0}>
          <SkipNext onClick={handleNext} fontSize={"inherit"} />
        </CircularButton>
        <CircularButton transform={90}>
          <StopCircleIcon onClick={handleReplay} fontSize={"inherit"} />
        </CircularButton>
        <CircularButton transform={180}>
          <SkipNext onClick={handlePrevious} fontSize={"inherit"} />
        </CircularButton>
        <CircularButton transform={270}>
          <AttachFileIcon fontSize={"inherit"} />
        </CircularButton>
      </Box>
    </Box>
  )
}
