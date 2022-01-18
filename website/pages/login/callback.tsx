import Head from 'next/head'
import { useRouter } from 'next/router'

const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUB_KEY

const LoginCallback: React.FunctionComponent = () => {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    window.addEventListener('@magic/ready', (event) => {
      // const { magic, idToken, userMetadata, oauth } = event.detail
      // ...
      console.log(event)
      router.push('/dashboard')
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
