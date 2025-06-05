"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="flex items-center gap-12">
        {/* Avatar with glow */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-purple-500/30 rounded-full blur-3xl"
            style={{
              transform: `translate(${(mousePosition.x - window.innerWidth / 2) * -0.02}px, ${
                (mousePosition.y - window.innerHeight / 2) * -0.02
              }px)`,
              transition: "transform 0.3s ease-out",
            }}
          ></div>
          <div className="relative z-10">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Avatar"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Hero text */}
        <div className="max-w-xl">
          <div className="mb-4">
            <span className="text-2xl">Hello! I Am </span>
            <span className="text-2xl text-purple-400">Abhinav Tiwary</span>
          </div>
          <div className="mb-2">
            <span className="text-xl text-gray-300">A Designer who</span>
          </div>
          <h1 className="text-6xl font-bold mb-2">
            Judges a book <br />
            by its <span className="text-purple-400">cover</span>...
          </h1>
          <p className="text-gray-300">Because if the cover does not impress you what else can?</p>
        </div>
      </div>
    </section>
  )
}
