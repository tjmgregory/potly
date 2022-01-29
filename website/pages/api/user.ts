import { authedApi } from '@/lib/auth'

export default authedApi(async ({ res, user }) => {
  // TODO: Do a DB lookup to get other use data
  res.json({ user })
})
