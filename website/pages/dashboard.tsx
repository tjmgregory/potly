import { Transaction } from '@/lib/types'
import Router from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import { Layout } from '@/components/Layout'
import { TransactionCard } from '@/components/Transactions'
import useUser from '@/hooks/useUser'
import { linkToLogin } from '@/lib/links'

const TransactionWrapper = styled.div``

const TransactionList = styled.ol`
  list-style-type: none;
  padding-inline-start: 0;
`

const TransactionItem = styled.li`
  margin: none;
  padding: none;
`

export default function Dashboard() {
  // const user = useUser({ ifNotFound: () => Router.push(linkToLogin()) })
  const { data, error } = useSWR<{ items: Transaction[] }>(
    '/api/transactions',
    async (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => ({ items: data?.items || [] }))
  )
  const loading = !data && !!error

  return (
    <Layout>
      <h1>Dashboard</h1>
      <TransactionWrapper>
        {data && (
          <TransactionList>
            {data.items.map((item) => (
              <TransactionItem key={item.id}>
                <TransactionCard transaction={item} />
              </TransactionItem>
            ))}
          </TransactionList>
        )}
      </TransactionWrapper>
    </Layout>
  )
}
