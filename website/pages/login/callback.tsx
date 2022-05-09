import Head from 'next/head'
import { useRouter } from 'next/router'
import { linkToDashboard, linkToSignUp } from '@/lib/links'

const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUB_KEY

const LoginCallback: React.FunctionComponent = () => {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    window.addEventListener('@magic/ready', async (event) => {
      const { idToken: didToken } = (event as any).detail

      // TODO: Use status on this request to determine
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
      } else {
        throw new Error(await res.text())
      }
    })
  }

  return (
    <Head>
      <script
        src="https://auth.magic.link/pnp/callback"
        data-magic-publishable-api-key={MAGIC_PUBLIC_KEY}
      ></script>
    </Head>
  )
}

export default LoginCallback
