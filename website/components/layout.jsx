import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const userPreferredName = 'Theo'
export const SITE_TITLE = 'Potly'

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel='icon' href='/favicon.ico' />
                <meta
                    name='description'
                    content='Learn how to build a personal website using Next.js'
                />
                <meta
                    property='og:image'
                    content={`https://og-image.vercel.app/${encodeURI(
                        SITE_TITLE
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name='og:title' content={SITE_TITLE} />
                <meta name='twitter:card' content='summary_large_image' />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src='/images/profile_picture.gif'
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt={userPreferredName}
                        />
                        <h1 className={utilStyles.heading2Xl}>
                            {userPreferredName}
                        </h1>
                    </>
                ) : (
                    <>
                        <Link href='/'>
                            <a>
                                <Image
                                    priority
                                    src='/images/profile_picture.gif'
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt={userPreferredName}
                                />
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href='/'>
                                <a className={utilStyles.colorInherit}>
                                    {userPreferredName}
                                </a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href='/'>
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}
