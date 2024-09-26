import CustomTypography from "@/app/components/common/CustomTypography"
import { playlistInfo } from "@/lib/utils/playlist"
import { Box, Button } from "@mui/material"

import { Modal } from "@mui/material"

type PlaylistProps = {
  currentTrack: number
  open: boolean
  handleClose: () => void
  handleVideoAt: (index: number) => void
}

export default function Playlist({
  currentTrack,
  open,
  handleClose,
  handleVideoAt,
}: PlaylistProps) {
  return (
    <Modal
      aria-describedby="modal-content"
      open={open}
      onClose={handleClose}
      sx={{
        zIndex: 10,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0 0 0 / 0.01)",
      }}
    >
      <Box
        id="modal-content"
        className="modal-description"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "justify-content",
          alignItems: "center",
          padding: 1.5,
          gap: 1,
          background: "var(--gradient)",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          sx={{
            background: "var(--background)",
            border: "1px solid var(--border-tertiary)",
            boxShadow: "inset 0px 2px 2px rgba(0, 0, 0, 0.5)",
            padding: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              background: "var(--background)",
              boxShadow: "inset 0px 2px 2px rgba(0, 0, 0, 0.3)",
              border: "1px solid var(--border-tertiary)",
            }}
          >
            <Box
              sx={{
                background: "var(--silver-gradient)",
                width: "100%",
                boxShadow:
                  "inset 1px 3px 4px rgba(0, 0, 0, 0.3), 0px 2px 2px rgba(0, 0, 0, 0.3)",
                padding: 1,
              }}
            >
              <CustomTypography size={12} color="var(--gray)" weight={600}>
                Time: 01:52:21
              </CustomTypography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                overflowY: "auto",
                maxHeight: "23vh",
                "&::-webkit-scrollbar": {
                  width: "16px",
                },
                "&::-webkit-scrollbar-track": {
                  border: "1px solid var(--border-tertiary)",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "var(--primary-gradient)",
                  border: "1px solid var(--border-tertiary)",
                  borderRadius: "3px",
                  boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  boxShadow: "inset 1px 1px 2px rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              {playlistInfo.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    color: "white",
                  }}
                >
                  <Button
                    onClick={() => handleVideoAt(index)}
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      textTransform: "none",
                      gap: 2,
                    }}
                  >
                    <CustomTypography
                      weight={600}
                      color={
                        currentTrack === index
                          ? "var(--primary)"
                          : "var(--text)"
                      }
                    >
                      {index}. {info.title} - {info.artist}
                    </CustomTypography>
                    <CustomTypography>{info.time}</CustomTypography>
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Button
          sx={{
            display: "flex",
            width: "100%",
            background: "var(--silver-gradient)",
            borderRadius: "0px",
            boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.4)",
            color: "var(--gray)",
            "&:hover": {
              boxShadow: "inset 1px 2px 3px rgba(0, 0, 0, 0.4)",
            },
          }}
          onClick={handleClose}
        >
          닫기
        </Button>
      </Box>
    </Modal>
  )
}
