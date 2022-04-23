import TransactionCard from '@/components/TransactionCard'
import { Currency, ISODate, Transaction } from '@/lib/types'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
  padding: 2%;
  border: 1px solid grey;
  border-radius: 3px;
  box-shadow: 0 2px 8px 4px hsl(0 0% 90%);
`

const Playground = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const dummyTransaction: Transaction = {
  id: '13fcb82f-8720-42ee-857f-3e3962979f6b',
  name: 'Pizza Gogo',
  cardName: 'Amex',
  amount: {
    value: 123.34,
    currency: Currency.GBP,
  },
  date: '2021-07-08T12:45:23.328Z' as ISODate,
  address: '10 Downing Street, SW1 1AA',
}

export default () => {
  return (
    <Container>
      <h1>Component Dev Zone</h1>
      <Playground>
        <TransactionCard transaction={dummyTransaction} />
      </Playground>
    </Container>
  )
}
