import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  linkToDashboard,
  linkToLanding,
  linkToLogin,
  linkToSignUp,
} from '@/lib/links'
import { useEffect } from 'react'

const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUB_KEY

const LoginCallback: React.FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    window.addEventListener('@magic/ready', async (event) => {
      const { idToken: didToken } = (event as any).detail

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${didToken}`,
        },
      })

      if (res.status === 200) {
        const response = await res.json()
        if (response.isRegisteredUser) {
          router.push(linkToDashboard())
        } else {
          router.push(linkToSignUp())
        }
      } else if (res.status === 401) {
        console.error(
          'Your Magic login was invalid, try again.',
          await res.json()
        )
        router.push(linkToLogin())
      } else if (res.status >= 400) {
        console.error('Something unexpected happened.', await res.json())
        router.push(linkToLanding())
      }
    })
  }, [])

  return (
    <Head>
      <script
        src="https://auth.magic.link/pnp/callback"
        data-magic-publishable-api-key={MAGIC_PUBLIC_KEY}
      ></script>
    </Head>
    // TODO: Add a spinner.
  )
}

export default LoginCallback
