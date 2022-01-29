import { Transaction } from '@/lib/types'
import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid grey;
`

const TransactionCard: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  return <Card>{transaction.description}</Card>
}

export default TransactionCard
