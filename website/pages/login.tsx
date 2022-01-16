import Head from 'next/head'
import Layout from '../components/layout'
import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'

export default function Login({ magicPublicKey }) {
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { elements } = event.target

    const did = await new Magic(magicPublicKey).auth.loginWithMagicLink({
      email: elements.email.value,
    })

    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    })

    if (authRequest.ok) {
      router.push('/dashboard')
    } else {
      /* handle errors */
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" />
        <button>Log in</button>
      </form>
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: { magicPublicKey: process.env.NEXT_PUBLIC_MAGIC_PUB_KEY },
  }
}
