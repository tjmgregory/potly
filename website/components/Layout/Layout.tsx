import Head from 'next/head'
import styled from 'styled-components'
import Header from './Header'

const SITE_TITLE = 'Potly'

const Box = styled.div``

const Main = styled.div`
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
`

const Layout: React.FunctionComponent<{
  home?: boolean
  redirectLoggedInUserTo?: string
}> = ({ children, home = false, redirectLoggedInUserTo }) => {
  return (
    <Box>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Your personal credit-boosting assistant."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            SITE_TITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        {redirectLoggedInUserTo && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (document.cookie && document.cookie.includes('authed')) {
                  window.location.href = "${redirectLoggedInUserTo}"
                }
              `,
            }}
          />
        )}
      </Head>
      <Header />
      <Main>{children}</Main>
    </Box>
  )
}
export default Layout
