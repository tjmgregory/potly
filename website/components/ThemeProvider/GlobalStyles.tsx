import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Nunito Sans', sans-serif;
    transition: all 100ms;
  }

  html, body {
    background-color: ${(p) => p.theme.colors.appBg};
    color: ${(p) => p.theme.colors.brand12};
  }

  a {
    color: inherit;
    &:hover {
      color: ${(p) => p.theme.colors.brand9};
    }
  }
`

export default GlobalStyles
