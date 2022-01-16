import globalReset from './globalStyles'

export default function App({ Component, pageProps }) {
  globalReset()
  return <Component {...pageProps} />
}
