import Switch from '@/components/Switch'
import TransactionCard from '@/components/TransactionCard'
import useDarkMode from '@/hooks/useDarkMode'
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
  border-radius: 3px;
  box-shadow: 0 0 9px 6px ${(p) => p.theme.colors.olive5} inset;
`

const Playground = styled.div`
  flex-grow: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`

const dummyTransaction: Transaction = {
  id: '13fcb82f-8720-42ee-857f-3e3962979f6b',
  name: 'Pizza Gogo with a name that is just too damn long for this card',
  cardName: 'Amex',
  amount: {
    value: 123.34,
    currency: Currency.GBP,
  },
  date: '2021-07-08T12:45:23.328Z' as ISODate,
  address: '10 Downing Street, SW1 1AA',
}

export default () => {
  const { mode, toggleDarkMode } = useDarkMode()
  return (
    <Container>
      <h1>Component Dev Zone</h1>
      <Playground>
        <TransactionCard transaction={dummyTransaction} />
        <Switch defaultChecked={mode === 'dark'} onClick={toggleDarkMode} />
      </Playground>
    </Container>
  )
}
