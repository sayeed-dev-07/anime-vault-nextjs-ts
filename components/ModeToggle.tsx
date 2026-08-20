"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to prevent Next.js hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full bg-secondary/50">
        <span className="h-5 w-5" />
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded-full overflow-hidden border-border bg-secondary/50 hover:bg-secondary/80 transition-colors duration-300"
    >
      {/* Sun Icon (Light Mode) */}
      <Sun 
        className={`absolute h-[1.2rem] w-[1.2rem] text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          resolvedTheme === "dark" ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
        }`} 
      />
      
      {/* Moon Icon (Dark Mode) */}
      <Moon 
        className={`absolute h-[1.2rem] w-[1.2rem] text-indigo-400 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          resolvedTheme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}