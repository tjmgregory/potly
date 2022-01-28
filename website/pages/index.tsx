import { styled } from '@stitches/react'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { SITE_TITLE } from '../components/layout'
import { getSortedPostsData } from '../js/posts'
import { linkToBlog, linkToLogin } from '../lib/links'

const H2 = styled('h2')

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{SITE_TITLE}</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                            if (document.cookie && document.cookie.includes('authed')) {
                              window.location.href = "/dashboard"
                            }
                        `,
          }}
        />
      </Head>
      <section>
        <p>Your personal credit score assistant.</p>
      </section>
      <section>
        <Link href={linkToLogin()}>
          <a>Login</a>
        </Link>
        <H2>Blog</H2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li>
              <Link href={linkToBlog(id)}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
