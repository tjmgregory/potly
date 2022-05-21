import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies, setCookiesForResponse } from './cookie'
import { seal, unseal } from '@/lib/encryption'

const SESSION_JWT_KEY = 'sessionJWT'

export interface SessionJWT {
  user: User
}

async function buildSessionToken(user: User) {
  const jwt: SessionJWT = {
    user,
  }
  return seal(jwt)
}

export async function setUserSessionCookies(res: NextApiResponse, user: User) {
  setCookiesForResponse(res, [
    {
      key: SESSION_JWT_KEY,
      value: await buildSessionToken(user),
    },
    { key: 'authed', value: 'true', options: { httpOnly: false } },
  ])
}

export async function getUserSessionTokenOrThrow(
  req: NextApiRequest
): Promise<SessionJWT> {
  const cookies = parseCookies(req)
  const sealedJWT = cookies[SESSION_JWT_KEY]
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
 * 403: No active Magic user session.
 */
export const authedApi: (callback: AuthedNextJSReqRes) => NextJSReqRes =
  (callback) => async (req: NextApiRequest, res: NextApiResponse) => {
    let sessionToken: SessionJWT

    try {
      sessionToken = await getUserSessionTokenOrThrow(req)
    } catch (e) {
      console.warn('Could not authenticate user.')
      res.status(403)
      return res.send(null)
    }

    return callback({ req, res, sessionToken })
  }
