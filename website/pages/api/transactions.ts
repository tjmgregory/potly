import { authedApi } from '../../lib/auth'

export default authedApi(async (req, res) => {
  res.json({ items: [{ foo: 'bah' }] })
})
