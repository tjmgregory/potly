import Head from 'next/head'
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
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            {title}
                            <br /> {date}{' '}
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
