"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input" // Import Input
import { Loader2 } from "lucide-react" // Import Loader2 icon
import { useRouter } from "next/navigation" // Import useRouter

const words = ["Intelligence", "Efficiency", "Precision", "Innovation"]
const gradients = [
  "from-blue-600 to-green-600",
  "from-purple-600 to-pink-600",
  "from-orange-600 to-red-600",
  "from-teal-600 to-cyan-600",
]

const illustrations = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/option%201.jpg-c7rFfA9XabUAO2HM9iks9drNlEGG57.jpeg",
    alt: "Three people collaborating with floating icons",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/option%201.jpg-9ITxdM78IAwlpXc4ISsoKbApLSqwp9.jpeg",
    alt: "Two people working with computer interface",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/option%201.jpg-FqttOY6KIS0QvsYQtZfNSyPoaAMceU.jpeg",
    alt: "Video call interface between two people",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/option%201.jpg-9Zstp5nNue81bmROCITBkEMSAWTzps.jpeg",
    alt: "Mobile chat interface with multiple conversations",
  },
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [websiteUrl, setWebsiteUrl] = useState("https://www.") // New state for website URL input
  const [launchLoading, setLaunchLoading] = useState(false) // New state for launch button loading
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    const checkAuthStatus = () => {
      const adminData = localStorage.getItem("adminData")
      const userData = localStorage.getItem("userData")
      setIsLoggedIn(!!(adminData || userData))
    }

    checkAuthStatus()
    const interval = setInterval(checkAuthStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout

    const animateText = () => {
      const currentWord = words[currentIndex]
      const currentGradient = gradients[currentIndex]

      if (!isDeleting && displayText === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), 3000)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
      } else {
        timer = setTimeout(
          () => {
            setDisplayText(currentWord.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1))
          },
          isDeleting ? 50 : 100,
        )
      }
    }

    animateText()

    return () => clearTimeout(timer)
  }, [currentIndex, displayText, isDeleting])

  const handleLaunchDemo = () => {
    if (websiteUrl.trim()) {
      setLaunchLoading(true)
      // Encode the URL to ensure it's safely passed as a query parameter
      router.push(`/demo?url=${encodeURIComponent(websiteUrl)}`)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 md:px-6 lg:px-8">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Main Grid */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-25"
          style={{
            backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
        `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Accent Grid */}
        <div
          className="absolute inset-0 opacity-25 dark:opacity-15"
          style={{
            backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.35) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.35) 1px, transparent 1px)
        `,
            backgroundSize: "120px 120px",
          }}
        />

        {/* Floating Grid Dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/40 dark:bg-blue-400/25 rounded-full animate-drift transition-transform duration-300 hover:animate-none hover:scale-150"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                "--duration": `${5 + Math.random() * 5}s`, // Increased speed for homepage (5s to 10s)
                "--delay": `${Math.random() * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-400/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-pulse" />
          <div
            className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/40 to-transparent animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-pink-500/40 to-transparent animate-pulse"
            style={{ animationDelay: "2.5s" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between lg:space-x-20">
        <div className="flex flex-col space-y-10 max-w-2xl mb-10 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Automate With
            <br />
            <span
              className={`text-5xl md:text-7xl bg-gradient-to-r ${gradients[currentIndex]} bg-clip-text text-transparent`}
            >
              {displayText}
            </span>
            <span className="animate-blink">|</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            24/7 automated inquiry handling system that streamlines your entire operational process with intelligent
            responses and efficient handling.
          </p>

          {/* Descriptive text for the demo input */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left mt-2">
            See how an AI chatbot can instantly enhance your website.
          </p>

          {/* Website link input field and Launch Demo button */}
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-center lg:justify-start w-full max-w-lg mx-auto lg:mx-0">
            <Input
              type="url"
              placeholder="Enter your website URL (e.g., https://example.com)"
              className="flex-grow p-3 text-base text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm placeholder:text-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder:text-gray-500"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLaunchDemo()
                }
              }}
            />
            <Button
              size="lg"
              onClick={handleLaunchDemo}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold"
              disabled={launchLoading || !websiteUrl.trim()}
            >
              {launchLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Launching...
                </>
              ) : (
                "Launch 🚀"
              )}
            </Button>
          </div>
        </div>
        <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl" aria-hidden="true">
          <div className="relative w-full" style={{ paddingBottom: "75%" }}>
            {illustrations.map((illustration, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{ opacity: index === currentIndex ? 1 : 0 }}
              >
                <Image
                  src={illustration.src || "/placeholder.svg"}
                  alt={illustration.alt}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
