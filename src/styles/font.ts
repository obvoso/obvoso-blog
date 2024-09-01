import { Inter, Noto_Serif_KR } from "next/font/google"

export const inter = Inter({ subsets: ["latin"] })

export const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  variable: "--noto",
})
