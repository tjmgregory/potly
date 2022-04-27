import { grass, grassDark, olive, oliveDark } from '@radix-ui/colors'

export const lightTheme = {
  fonts: {
    system: 'system-ui',
  },
  colors: {
    ...grass,
    ...olive,
    brand1: grass.grass1,
    brand2: grass.grass2,
    brand3: grass.grass3,
    brand4: grass.grass4,
    brand5: grass.grass5,
    brand6: grass.grass6,
    brand7: grass.grass7,
    brand8: grass.grass8,
    brand9: grass.grass9,
    brand10: grass.grass10,
    brand11: grass.grass11,
    brand12: grass.grass12,
    gray1: olive.olive1,
    gray2: olive.olive2,
    gray3: olive.olive3,
    gray4: olive.olive4,
    gray5: olive.olive5,
    gray6: olive.olive6,
    gray7: olive.olive7,
    gray8: olive.olive8,
    gray9: olive.olive9,
    gray10: olive.olive10,
    gray11: olive.olive11,
    gray12: olive.olive12,
    appBg: olive.olive1,
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

export const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: {
    ...grassDark,
    ...oliveDark,
    brand1: grassDark.grass1,
    brand2: grassDark.grass2,
    brand3: grassDark.grass3,
    brand4: grassDark.grass4,
    brand5: grassDark.grass5,
    brand6: grassDark.grass6,
    brand7: grassDark.grass7,
    brand8: grassDark.grass8,
    brand9: grassDark.grass9,
    brand10: grassDark.grass10,
    brand11: grassDark.grass11,
    brand12: grassDark.grass12,
    gray1: oliveDark.olive1,
    gray2: oliveDark.olive2,
    gray3: oliveDark.olive3,
    gray4: oliveDark.olive4,
    gray5: oliveDark.olive5,
    gray6: oliveDark.olive6,
    gray7: oliveDark.olive7,
    gray8: oliveDark.olive8,
    gray9: oliveDark.olive9,
    gray10: oliveDark.olive10,
    gray11: oliveDark.olive11,
    gray12: oliveDark.olive12,
    appBg: oliveDark.olive1,
  },
}

export type Theme = typeof lightTheme
