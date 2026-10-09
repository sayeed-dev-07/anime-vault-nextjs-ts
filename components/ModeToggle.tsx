"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-none border-foreground/30 bg-transparent w-9 h-9 sm:w-10 sm:h-10">
        <span className="h-4 w-4" />
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
      className="relative cursor-pointer rounded-none border border-foreground/30 bg-transparent hover:bg-foreground hover:text-background dark:hover:text-background dark:hover:bg-foreground hover:border-foreground transition-all duration-300 w-9 h-9 sm:w-10 sm:h-10 group"
    >
      <Sun
        className={`absolute h-4 w-4 text-current transition-all duration-500 ease-out ${resolvedTheme === "dark" ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
          }`}
      />

      <Moon
        className={`absolute h-4 w-4 text-current transition-all duration-500 ease-out ${resolvedTheme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}