import { authedApi } from '@/lib/userAuth'

// TODO: This endpoint is not somewhat redundant as all user information is
// stored in the user session token.
export default authedApi(async ({ res, sessionToken }) => {
  res.status(200).json(sessionToken.user)
})
