import Router from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import Layout from '../components/layout'
import TransactionCard from '../components/TransactionCard'
import useUser from '../hooks/useUser'
import { linkToLogin } from '../lib/links'

const TransactionWrapper = styled.div``

export default function Dashboard() {
  const user = useUser({ ifNotFound: () => Router.push(linkToLogin()) })
  const { data, error } = useSWR('/api/transactions', async (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => ({ items: data?.items || [] }))
  )

  console.log('theo-30860', JSON.stringify({ data, error }, null, 2))
  return (
    <Layout>
      <h1>Dashboard</h1>
      <TransactionWrapper>
        <TransactionCard />
      </TransactionWrapper>
    </Layout>
  )
}
