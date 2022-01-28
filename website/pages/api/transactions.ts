import { authedApi } from '../../lib/auth'
import { Currency, MonetaryAmount } from '../../lib/currency'
import { ISODate } from '../../lib/isoDate'

interface Transaction {
  id: string
  description: string
  cardName: string
  amount: MonetaryAmount
  date: ISODate
  address: string
}

const dummyTransactions: Transaction[] = [
  {
    id: '13fcb82f-8720-42ee-857f-3e3962979f6b',
    description: 'Pizza Gogo',
    cardName: 'Amex',
    amount: {
      value: 123.34,
      currency: Currency.GBP,
    },
    date: '2021-07-08T12:45:23.328Z' as ISODate,
    address: '10 Downing Street, SW1 1AA',
  },
]

export default authedApi(async ({ res }) => {
  res.json({ items: dummyTransactions })
})
