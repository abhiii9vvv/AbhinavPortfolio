import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Abhinav Tiwary - Software Engineer & Developer",
  description:
    "Portfolio of Abhinav Tiwary - B.Tech CSE student at Sharda University, passionate about AI, web development, and software engineering.",
  keywords: "Abhinav Tiwary, Software Engineer, Developer, Portfolio, React, Python, AI, Machine Learning",
  authors: [{ name: "Abhinav Tiwary" }],
  openGraph: {
    title: "Abhinav Tiwary - Software Engineer & Developer",
    description: "Portfolio showcasing innovative projects in AI, web development, and software engineering",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
