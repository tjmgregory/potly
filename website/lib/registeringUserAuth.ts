import { parseCookies, setCookiesForResponse } from '@/lib/cookie'
import { RegisteringUser } from '@prisma/client'
import { seal } from '@/lib/encryption'
import { NextApiRequest, NextApiResponse } from 'next'

const REGISTERING_USER_SESSION_KEY = 'REGISTERING_USER_SESSION_KEY'

interface RegisteringUserJWT {
  registeringUser: {
    id: string
    magicUserId: string
  }
}

export async function setRegisteringSessionCookie(
  res: NextApiResponse,
  registeringUser: RegisteringUser
): Promise<void> {
  const jwt: RegisteringUserJWT = {
    registeringUser: {
      id: registeringUser.id,
      magicUserId: registeringUser.magicUserId,
    },
  }
  setCookiesForResponse(res, [
    { key: REGISTERING_USER_SESSION_KEY, value: await seal(jwt) },
  ])
}

// async function getRegisteringSessionCookie(
//   req: NextApiRequest
// ): Promise<RegisteringUser> {

// }
