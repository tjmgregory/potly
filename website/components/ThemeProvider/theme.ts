export const lightTheme = {
  fonts: {
    system: 'system-ui',
  },
  colors: {},
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

export const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: {},
}

export type Theme = typeof lightTheme
