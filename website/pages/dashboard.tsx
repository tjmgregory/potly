import Layout from '../components/layout'
import useAuth from '../hooks/useAuth'

export default function Dashboard() {
    const { user, loading } = useAuth()
    return (
        <Layout>
            <h1>Dashboard</h1>
            {loading ? 'Loading...' : JSON.stringify(user)}
        </Layout>
    )
}
