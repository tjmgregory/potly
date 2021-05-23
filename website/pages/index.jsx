import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { SITE_TITLE } from '../components/layout'
import { getSortedPostsData } from '../js/posts'
import utilStyles from '../styles/utils.module.css'

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{SITE_TITLE}</title>
            </Head>
            <section className={utilStyles.headingXl}>Potly</section>
            <section className={utilStyles.headingMd}>
                <p>Your personal credit score assistant.</p>
            </section>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <Link href="/login"><a>Login</a></Link>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/blog/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
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
