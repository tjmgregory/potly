import Head from 'next/head'
import { useRouter } from 'next/router'

const LoginCallback: React.FunctionComponent<{ magicPublicKey: string }> = ({
  magicPublicKey,
}) => {
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
        data-magic-publishable-api-key={magicPublicKey}
      ></script>
    </Head>
  )
}

export function getStaticProps() {
  return {
    props: { magicPublicKey: process.env.NEXT_PUBLIC_MAGIC_PUB_KEY },
  }
}

export default LoginCallback
