import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

export default function Dashboard() {
  const { userEmail } = useAuth()
  return (
    <Layout>
      <h1>Dashboard</h1>
      {userEmail}
    </Layout>
  )
}
