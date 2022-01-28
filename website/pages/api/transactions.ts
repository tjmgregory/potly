import { authedApi } from '../../lib/auth'

export default authedApi(async ({ res }) => {
  res.json({ items: [{ foo: 'bah' }] })
})
