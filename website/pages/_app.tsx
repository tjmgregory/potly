import { ThemeProvider } from '@/components/Layout'
import useDarkMode from '@/hooks/useDarkMode'

export default function App({ Component, pageProps }) {
  const { theme } = useDarkMode()
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
