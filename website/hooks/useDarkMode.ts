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

  const toggleDarkMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('theme', newMode)
    window.dispatchEvent(new Event('dark_mode_toggled'))
    setMode(newMode)
  }

  useEffect(() => {
    const setCurrentMode = () => {
      const current = window.localStorage.getItem('theme')
      // @ts-ignore
      setMode(current)
    }
    setCurrentMode()

    window.addEventListener('dark_mode_toggled', setCurrentMode)
    return () => {
      window.removeEventListener('dark_mode_toggled', setCurrentMode)
    }
  }, [])

  const theme = mode === 'light' ? lightTheme : darkTheme

  return { mode, theme, toggleDarkMode }
}
