import { darkTheme, lightTheme, Theme } from '@/components/ThemeProvider/theme'
import { useEffect, useState } from 'react'

type Mode = 'light' | 'dark'

interface ReturnType {
  mode: Mode
  theme: Theme
  toggleDarkMode: () => void
}

export default function useDarkMode(): ReturnType {
  const [mode, setMode] = useState<Mode>('dark')

  const setDarkMode = (newMode: Mode) => {
    window.localStorage.setItem('theme', newMode)
    setMode(newMode)
  }

  const toggleDarkMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setDarkMode(newMode)
  }

  useEffect(() => {
    const current = window.localStorage.getItem('theme')
    if (current) {
      // @ts-ignore
      setMode(current)
    }
  }, [])

  const theme = mode === 'light' ? lightTheme : darkTheme

  return { mode, theme, toggleDarkMode }
}
