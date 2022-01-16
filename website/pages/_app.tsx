import globalReset from './globalReset'

export default function App({ Component, pageProps }) {
  globalReset()
  return <Component {...pageProps} />
}
