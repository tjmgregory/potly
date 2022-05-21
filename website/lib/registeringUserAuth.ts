import { parseCookies, setCookiesForResponse } from '@/lib/cookie'
import { RegisteringUser } from '@prisma/client'
import { seal, unseal } from '@/lib/encryption'
import { NextApiRequest, NextApiResponse } from 'next'

const REGISTERING_USER_SESSION_KEY = 'REGISTERING_USER_SESSION_KEY'

export interface RegisteringUserJWT {
  registeringUser: {
    id: string
    magicUserId: string
    email: string
  }
}

export async function setRegisteringUserSessionCookie(
  res: NextApiResponse,
  registeringUser: RegisteringUser
): Promise<void> {
  const jwt: RegisteringUserJWT = {
    registeringUser: {
      id: registeringUser.id,
      magicUserId: registeringUser.magicUserId,
      email: registeringUser.email
    },
  }
  setCookiesForResponse(res, [
    { key: REGISTERING_USER_SESSION_KEY, value: await seal(jwt) },
  ])
}

export async function getRegisteringUserSessionTokenOrThrow(
  req: NextApiRequest
): Promise<RegisteringUserJWT> {
  const cookies = parseCookies(req)
  const sealedJWT = cookies[REGISTERING_USER_SESSION_KEY]
  if (!sealedJWT) {
    throw new Error('No session JWT exists for this registering user.')
  }

  return unseal(sealedJWT)
}
