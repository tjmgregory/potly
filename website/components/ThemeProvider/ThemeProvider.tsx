import { ThemeProvider } from 'styled-components'
import CSSReset from './CSSReset'
import GlobalStyles from './GlobalStyles'
import theme from './theme'

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <GlobalStyles />
    {children}
  </ThemeProvider>
)

export default Theme
