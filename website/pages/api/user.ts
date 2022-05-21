import { authedApi } from '@/lib/userAuth'

/**
 * At present, this API simply decrypts the contents of the
 * user session token and returns the user.
 * 200: Success.
 * 401: Not logged in.
 */
export default authedApi(async ({ res, sessionToken }) => {
  res.status(200).json(sessionToken.user)
})
