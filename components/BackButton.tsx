'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'motion/react';
export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // Hide back button on root
  if (pathname === '/') return null

  return (
    <motion.button initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.2, type:'spring', damping:20, stiffness:200, delay:0.2}}
      onClick={() => router.back()}
      className="px-3 py-3 cursor-pointer
      hover:bg-foreground
                text-background
                 bg-foreground/80 hover:scale-105
                 transition-all duration-200 ease-linear
                 rounded-4xl"
    >
      <ArrowLeft />
    </motion.button>
  )
}
