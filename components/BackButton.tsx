'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // Hide back button on root
  if (pathname === '/') return null

  return (
    <button
      onClick={() => router.back()}
      className="px-3 py-3 cursor-pointer
      hover:bg-foreground
                text-background
                 bg-foreground/80 hover:scale-105
                 transition-all duration-200 ease-linear
                 rounded-4xl"
    >
      <ArrowLeft />
    </button>
  )
}
