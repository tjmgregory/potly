import { Currency, MonetaryAmount, Transaction } from '@/lib/types'
import { format } from 'date-fns'
import styled from 'styled-components'

const Card = styled.article`
  border: 1px solid grey;
  border-radius: 8px;
  padding: 8px;
  width: 512px;
  height: 116px;
`
const CardGrid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'merchant price action'
    'time price action';
`

const Merchant = styled.h3`
  grid-area: merchant;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  padding-left: 16px;
  align-self: end;
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

// TODO: Next, design this.
const TransactionCard: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  const dateTimeString = formatDate(new Date(transaction.date))
  const price = formatPrice(transaction.amount)
  return (
    <Card>
      <CardGrid>
        <Merchant>{transaction.description}</Merchant>
        <DateTime>{dateTimeString}</DateTime>
        <Price>{price}</Price>
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
