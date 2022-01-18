import globalStyles from './globalStyles'

export default function App({ Component, pageProps }) {
  globalStyles()
  return <Component {...pageProps} />
}
