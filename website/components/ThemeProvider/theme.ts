import { ThemeProvider } from 'styled-components'

type Theme = React.ComponentProps<typeof ThemeProvider>['theme']

const theme: Theme = {
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

export default theme
