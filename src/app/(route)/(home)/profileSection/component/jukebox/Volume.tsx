import { Slider } from "@mui/material"

type SliderProps = {
  value: number
  onChange: (event: Event, newValue: number | number[]) => void
}

export default function Volume({ onChange, value }: SliderProps) {
  return (
    <Slider
      value={value}
      onChange={onChange}
      aria-label="volume-slider"
      min={0}
      max={100}
      size="small"
      sx={{
        position: "absolute",
        width: "80%",
        left: "-14%",
        bottom: "-29%",
        color: "transparent",
        height: 6,
        "& .MuiSlider-track": {
          background: "var(--primary-gradient)",
          boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.4)",
        },
        "& .MuiSlider-rail": {
          backgroundColor: "#b3cde3",
          opacity: 1,
        },
        "& .MuiSlider-thumb": {
          width: 10,
          height: 6,
          backgroundColor: "white",
          border: "2px solid #b3cde3",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        },
      }}
    />
  )
}
