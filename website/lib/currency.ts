export enum Currency {
  GBP = 'GBP',
}

export interface MonetaryAmount {
  value: number
  currency: Currency
}
