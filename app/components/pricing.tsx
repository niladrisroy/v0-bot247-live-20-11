"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export function Pricing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedUserPlan, setSelectedUserPlan] = useState<string | null>(null)

  useEffect(() => {
    const checkAuthStatus = () => {
      const adminData = localStorage.getItem("adminData")
      const userDataString = localStorage.getItem("userData") // Get the string
      const loggedIn = !!(adminData || userDataString)
      setIsLoggedIn(loggedIn)

      if (loggedIn && userDataString) {
        try {
          const userData = JSON.parse(userDataString)
          // Assuming userData has a 'plan' property, e.g., { plan: "Basic" }
          setSelectedUserPlan(userData.plan || null)
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e)
          setSelectedUserPlan(null)
        }
      } else {
        setSelectedUserPlan(null)
      }
    }

    checkAuthStatus()
    const interval = setInterval(checkAuthStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
              Simple, transparent pricing
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Choose the plan that's right for your organization and start improving your inquiry handling process
              today.
            </p>
          </div>
        </div>
        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {" "}
          {/* Adjusted grid for 4 plans */}
          {/* Free Plan Card */}
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between">
            <div>
              <h3 className="text-2xl font-bold text-center">Free Plan</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">Free Trial</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">50 chats/month</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Email support</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">bot247.live branding</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">10 FAQ uploads</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              {!isLoggedIn ? (
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              ) : // Logic for logged-in user
              selectedUserPlan === "Free Plan" ? (
                <Link href="/dashboard">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/contact">
                  <Button className="w-full">Contact Us</Button>
                </Link>
              )}
            </div>
          </div>
          {/* Basic Plan Card */}
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between">
            <div>
              <h3 className="text-2xl font-bold text-center">Basic</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">₹ 3000</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Upto 200 chat sessions/month</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Basic AI chatbot</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Website Crawl Data</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Email support</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Basic Analytics and Chat history</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Unlimited FAQs upload</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">bot247.live branding</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              {!isLoggedIn ? (
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              ) : // Logic for logged-in user
              selectedUserPlan === "Basic" ? (
                <Link href="/dashboard">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/contact">
                  <Button className="w-full">Contact Us</Button>
                </Link>
              )}
            </div>
          </div>
          {/* Pro Plan Card */}
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between">
            <div>
              <h3 className="text-2xl font-bold text-center">Pro</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">₹ 7000</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Upto 1500 chat session</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Advanced AI chatbot</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Upto 20 data source(including URL, PDF, TXT, CSV)</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Custom co-branding</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Unlimited FAQs upload</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              {!isLoggedIn ? (
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              ) : // Logic for logged-in user
              selectedUserPlan === "Pro" ? (
                <Link href="/dashboard">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/contact">
                  <Button className="w-full">Contact Us</Button>
                </Link>
              )}
            </div>
          </div>
          {/* Advanced Plan Card */}
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between">
            <div>
              <h3 className="text-2xl font-bold text-center">Advanced</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">₹ 10000</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Whatsapp Business API Registration and Integration</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Upto 4000 chat session</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Advanced AI chatbot</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Upto 20 data source(including URL, PDF, TXT, CSV)</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Custom branding</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-green-500 flex-shrink-0 h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="ml-2">Unlimited FAQs upload</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              {!isLoggedIn ? (
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              ) : // Logic for logged-in user
              selectedUserPlan === "Advanced" ? (
                <Link href="/dashboard">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/contact">
                  <Button className="w-full">Contact Us</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
