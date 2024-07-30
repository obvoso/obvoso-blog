import Header from "@/components/layout/Header"
import "@/styles/globals.css"
import "@/styles/themes.css"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
