import Head from 'next/head'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'

const Login: React.FunctionComponent<{ magicPublicKey: string }> = ({
  magicPublicKey,
}) => {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>Login</title>
        <script
          src="https://auth.magic.link/pnp/login"
          data-magic-publishable-api-key={magicPublicKey}
          data-terms-of-service-uri="/path/to/your/terms-of-service"
          data-privacy-policy-uri="/path/to/your/privacy-policy"
          data-redirect-uri="/login/callback"
        ></script>
      </Head>
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: { magicPublicKey: process.env.NEXT_PUBLIC_MAGIC_PUB_KEY },
  }
}

export default Login
