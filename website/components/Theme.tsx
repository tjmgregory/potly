import { createGlobalStyle, ThemeProvider } from 'styled-components'

const theme = {
  fonts: {
    system: 'system-ui',
  },
  colors: {
    hiContrast: 'hsl(206,10%,5%)',
    loContrast: 'white',
    gray100: 'hsl(206,22%,99%)',
    gray200: 'hsl(206,12%,97%)',
    gray300: 'hsl(206,11%,92%)',
    gray400: 'hsl(206,10%,84%)',
    gray500: 'hsl(206,10%,76%)',
    gray600: 'hsl(206,10%,44%)',
  },
  fontSizes: {
    1: '1rem',
    2: '1.1rem',
    3: '1.25rem',
    4: '1.4rem',
    5: '1.55rem',
    6: '1.7rem',
    7: '2rem',
    8: '2.8rem',
    9: '3.5rem',
  },
  sizes: {},
  utils: {
    // Abbreviated margin properties
    // @ts-ignore
    m: (value) => ({
      margin: value,
    }),
    // @ts-ignore
    mt: (value) => ({
      marginTop: value,
    }),
    // @ts-ignore
    mr: (value) => ({
      marginRight: value,
    }),
    // @ts-ignore
    mb: (value) => ({
      marginBottom: value,
    }),
    // @ts-ignore
    ml: (value) => ({
      marginLeft: value,
    }),
    // @ts-ignore
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    // @ts-ignore
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),

    // A property for applying width/height together
    // @ts-ignore
    size: (value) => ({
      width: value,
      height: value,
    }),

    // A property to apply linear gradient
    // @ts-ignore
    linearGradient: (value) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    // An abbreviated property for border-radius
    // @ts-ignore
    br: (value) => ({
      borderRadius: value,
    }),
  },
}

/*
 * Copied from Josh Comeau's CSS Global Reset in the CSS-For-JS Course Tresaure Trove
 * https://courses.joshwcomeau.com/css-for-js/treasure-trove/010-global-styles
 */
const GlobalStyle = createGlobalStyle`
  /*
    1. Use a more-intuitive box-sizing model.
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  /*
    2. Remove default margin
  */
  * {
    margin: 0;
  }
  /*
    3. Allow percentage-based heights in the application
  */
  html, body {
    height: 100%;
  }
  /*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  /*
    6. Improve media defaults
  */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  /*
    7. Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }
  /*
    8. Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  /*
    9. Create a root stacking context
  */
  #root, #__next {
    isolation: isolate;
  }
`

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
)

export default Theme
