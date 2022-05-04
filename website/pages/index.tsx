import Link from 'next/link'
import Date from '@/components/date'
import Layout from '@/components/layout'
import { getSortedPostsData } from '@/lib/posts'
import { linkToBlog, linkToLogin } from '@/lib/links'
import styled from 'styled-components'

const H2 = styled.h2``

export default function Home({ allPostsData }) {
  return (
    <Layout home redirectLoggedInUserTo="/dashboard">
      <section>
        <p>Your personal credit score assistant.</p>
      </section>
      <section>
        <H2>Blog</H2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={linkToBlog(id)}>{title}</Link>
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
