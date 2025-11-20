"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface InternalHeroProps {
  title?: string // Made optional
  description?: string // Made optional
  icon?: ReactNode
  className?: string
}

export function InternalHero({ title, description, icon, className }: InternalHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden pt-20 pb-8 px-4 md:px-6 lg:px-8 text-center bg-white dark:bg-gray-950", // Changed py-8 to pt-20 pb-8
        className,
      )}
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center text-center">
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        {title && <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h1>}
        {description && (
          <p className="text-base md:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">{description}</p>
        )}
      </div>
    </section>
  )
}
