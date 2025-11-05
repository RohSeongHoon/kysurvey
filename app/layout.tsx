import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AppBar from "./components/AppBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "주말 2일 앱 제작 오프라인 강의 참가 희망자 설문조사",
  description: "시청역 근처에서 진행될 주말 2일 앱 제작 오프라인 강의 참가 희망자를 위한 사전 설문조사입니다.",
  keywords: "앱 제작, 오프라인 강의, 시청역, 개발 교육, 창업",
  generator: 'v0.dev',
  icons: {
    icon: '/images/icons/black_icon.png',
    shortcut: '/images/icons/black_icon.png',
    apple: '/images/icons/black_icon.png',
  },
  openGraph: {
    title: "주말 2일 앱 제작 오프라인 강의",
    description: "편한 분위기에서 함께 앱 만들어요!",
    images: ['/back.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "주말 2일 앱 제작 오프라인 강의",
    description: "편한 분위기에서 함께 앱 만들어요!",
    images: ['/back.png'],
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AppBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
