import Router from 'next/router'
import Layout from '../components/layout'
import useUser from '../hooks/useUser'
import { linkToLogin } from '../lib/links'

export default function Dashboard() {
  const user = useUser({ ifNotFound: () => Router.push(linkToLogin()) })
  if (!user) {
    return null
  }

  return (
    <Layout>
      <h1>Dashboard</h1>
      {user.email}
    </Layout>
  )
}
