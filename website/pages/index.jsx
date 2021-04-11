import Head from 'next/head'
import Layout, { SITE_TITLE } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{SITE_TITLE}</title>
            </Head>
            <section className={utilStyles.headingXl}>Potly</section>
            <section className={utilStyles.headingMd}>
                <p>Your personal credit score assistant.</p>
            </section>
        </Layout>
    )
}
