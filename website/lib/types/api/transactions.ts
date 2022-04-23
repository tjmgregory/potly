import { ISODate, MonetaryAmount } from '../common'

export interface Transaction {
  id: string
  name: string
  cardName: string
  amount: MonetaryAmount
  date: ISODate
  address: string
}
