"use client"

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useScrollToHash } from "../hooks/useScrollToHash"

export function Footer() {
  const { theme } = useTheme()
  const pathname = usePathname()
  useScrollToHash() // Use the custom hook

  const handleSectionClick = (sectionId: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${sectionId}`
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const navHeight = 80 // Adjust this value based on your navbar height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-4">
              <Image
                src={"/images/bot247.live_logo.png"}
                alt="Bot247 Logo"
                width={200}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              Bot247.live provides intelligent inquiry handling solutions for organizations worldwide, streamlining
              operational processes with AI-powered automation.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {["features", "benefits", "implementation", "pricing", "docs"].map((item) => (
                <li key={item}>
                  {item === "docs" ? (
                    <Link
                      href="/docs"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      Docs
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSectionClick(item)}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {["about", "careers", "contact", "blog", "press"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {["privacy-policy", "terms-of-service", "cookie-policy", "security"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {item
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Bot247.live. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 text-sm"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
