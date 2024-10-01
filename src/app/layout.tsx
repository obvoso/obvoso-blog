import RecoilRootWrapper from "@/app/RecoilWrapper"
import { notoSansKr, notoSerifKr } from "@/styles/font"
import "@/styles/globals.css"
import "@/styles/themes.css"
import { Box } from "@mui/material"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import MobileHeader from "./(home)/profileSection/mobile/MobileHeader"
import Footer from "./components/layout/Footer"

export const metadata: Metadata = {
  title: "obvoso blog",
  description: "hihi",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansKr.className}, ${notoSerifKr.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <RecoilRootWrapper>
              <MobileHeader />
              <main>{children}</main>
              <Footer />
            </RecoilRootWrapper>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}
