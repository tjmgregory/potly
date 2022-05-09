import { ThemeProvider as BaseThemeProvider } from 'styled-components'
import CSSReset from './CSSReset'
import GlobalStyles from './GlobalStyles'
import { Theme } from './theme'

const ThemeProvider: React.FC<{ theme: Theme }> = ({ theme, children }) => (
  <BaseThemeProvider theme={theme}>
    <CSSReset />
    <GlobalStyles />
    {children}
  </BaseThemeProvider>
)

export default ThemeProvider
