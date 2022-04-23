import { Currency, MonetaryAmount, Transaction } from '@/lib/types'
import { format } from 'date-fns'
import styled from 'styled-components'

const Card = styled.article`
  border: 1px solid hsl(0 0% 50%);
  border-radius: 8px;
  padding: 8px;
  width: 512px;
  height: 116px;
  box-shadow: 0 2px 5px 1px hsl(0 0% 70%);
`
const CardGrid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'merchant price action'
    'time price action';
`

// TODO: Add a tooltip on hover to show full name if truncated
const Merchant = styled.h3`
  grid-area: merchant;
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  margin: 0;
  padding-left: 16px;
  align-self: end;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DateTime = styled.p`
  grid-area: time;
  font-size: 1rem;
  margin: 0;
  color: grey;
  padding-top: 8px;
  padding-left: 16px;
  align-self: start;
`

const Price = styled.p`
  grid-area: price;
  font-size: 1.3rem;
  margin: 0;
  align-self: center;
  justify-self: center;
`

const Actions = styled.ul`
  grid-area: action;
  align-self: center;
  justify-self: center;
  list-style: none;
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 0;
  width: 90%;
`

const ActionButton = styled.button`
  width: 100%;
  background-color: hsl(0 0% 90%);
  border: 1px solid hsl(0 0% 80%);
  border-radius: 4px;
  text-align: center;
  padding: 2px 8px;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: hsl(0 0% 85%);
    border: 1px solid hsl(0 0% 50%);
  }
`

const ActionWrapper = styled.li``

const Action: React.FC<React.ComponentProps<typeof ActionButton>> = (p) => {
  return (
    <ActionWrapper>
      <ActionButton {...p} />
    </ActionWrapper>
  )
}

const TransactionCard: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  const dateTimeString = formatDate(new Date(transaction.date))
  const price = formatPrice(transaction.amount)
  return (
    <Card>
      <CardGrid>
        <Merchant>{transaction.name}</Merchant>
        <DateTime>{dateTimeString}</DateTime>
        <Price>{price}</Price>
        <Actions>
          <Action>Mine</Action>
          <Action>Split</Action>
          <Action>Theirs</Action>
        </Actions>
      </CardGrid>
    </Card>
  )
}

const currencySymbolMap = { [Currency.GBP]: '£' }

function formatPrice(value: MonetaryAmount): string {
  let symbol = currencySymbolMap[value.currency]
  if (!symbol) {
    console.warn('Currency not supported, using Simoleons', value.currency)
    symbol = '§'
  }
  return `${symbol}${value.value.toFixed(2)}`
}

function formatDate(date: Date): string {
  const formatted = format(date, 'io LLL yy') // https://date-fns.org/v2.28.0/docs/format
  return formatted.slice(0, -2) + "'" + formatted.slice(-2)
}

export default TransactionCard
