import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie, parseCookies, setCookiesForResponse } from './cookie'
import { seal, unseal } from '@/lib/encryption'

const SESSION_JWT_KEY = 'SESSION_JWT_KEY'
const SESSION_SIGNAL_KEY = 'SESSION_SIGNAL_KEY'

export interface SessionJWT {
  user: User
}

export async function setUserSessionCookies(res: NextApiResponse, user: User) {
  const jwt: SessionJWT = {
    user,
  }
  const sealed = await seal(jwt)
  setCookiesForResponse(res, [
    {
      key: SESSION_JWT_KEY,
      value: sealed,
    },
    { key: SESSION_SIGNAL_KEY, value: 'true', options: { httpOnly: false } },
  ])
}

export function clearUserSessionCookies(res: NextApiResponse): void {
  deleteCookie(res, SESSION_JWT_KEY)
  deleteCookie(res, SESSION_SIGNAL_KEY)
}

export async function getUserSessionTokenOrThrow(
  req: NextApiRequest
): Promise<SessionJWT> {
  const cookies = parseCookies(req)
  const sealedJWT = cookies.SESSION_JWT_KEY
  if (!sealedJWT) {
    throw new Error('No session JWT exists for this user.')
  }

  return unseal(sealedJWT)
}

type NextJSReqRes = (req: NextApiRequest, res: NextApiResponse) => Promise<void>
type AuthedNextJSReqRes = (params: {
  req: NextApiRequest
  res: NextApiResponse
  sessionToken: SessionJWT
}) => Promise<void>

/**
 * 401: No active user session token.
 */
export const authedApi: (callback: AuthedNextJSReqRes) => NextJSReqRes =
  (callback) => async (req: NextApiRequest, res: NextApiResponse) => {
    let sessionToken: SessionJWT

    try {
      sessionToken = await getUserSessionTokenOrThrow(req)
    } catch (e) {
      console.warn('User is not logged in.')
      res.status(401)
      return res.send(null)
    }

    return callback({ req, res, sessionToken })
  }
