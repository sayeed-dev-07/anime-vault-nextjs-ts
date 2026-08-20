'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'motion/react'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // Hide back button on root
  if (pathname === '/') return null

  return (
    <motion.button 
      // Enhanced entrance animation: pops up and scales in smoothly
      initial={{ opacity: 0, scale: 0.5, y: 20 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      transition={{ duration: 0.3, type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
      
      onClick={() => router.back()}
      aria-label="Go back"
      
      className="
        group flex items-center cursor-pointer justify-center 
        p-3 sm:p-4 rounded-full 
        bg-foreground text-background 
        shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-[crimson]/50 focus:ring-offset-2 focus:ring-offset-background
      "
    >
      <ArrowLeft 
        className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ease-out group-hover:-translate-x-1" 
      />
    </motion.button>
  )
}