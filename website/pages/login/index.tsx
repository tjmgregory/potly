import Head from 'next/head'
import { linkToLoginCallback } from '@/lib/links'

const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUB_KEY

const Login: React.FunctionComponent = () => {
  return (
    <Head>
      <title>Login</title>
      <script
        src="https://auth.magic.link/pnp/login"
        data-magic-publishable-api-key={MAGIC_PUBLIC_KEY}
        data-terms-of-service-uri="/path/to/your/terms-of-service"
        data-privacy-policy-uri="/path/to/your/privacy-policy"
        data-redirect-uri={linkToLoginCallback()}
      ></script>
    </Head>
  )
}

export default Login
