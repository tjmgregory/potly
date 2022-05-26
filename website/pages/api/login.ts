import { Magic, MagicUserMetadata } from '@magic-sdk/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import {
  clearUserSessionCookies,
  getUserSessionTokenOrThrow,
  setUserSessionCookies,
} from '@/lib/userAuth'
import {
  clearRegisteringUserSessionCookie,
  setRegisteringUserSessionCookie,
} from '@/lib/registeringUserAuth'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export interface LoginResponse {
  isRegisteredUser: boolean
}

function sendResponse(
  res: NextApiResponse,
  status: number,
  response: LoginResponse
): void {
  res.status(status).json(response)
}

/**
 * Will log you in or initiate registration for non users.
 * 200: { isRegisteredUser: boolean }
 *   - true: User is logged in.
 *   - false: User is logged in as a registering user. Token only valid for
 *            use with /sign-up.
 * 401: Invalid or unexchangable Magic Bearer token.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    await getUserSessionTokenOrThrow(req)
    clearRegisteringUserSessionCookie(res)
    return sendResponse(res, 200, { isRegisteredUser: true })
  } catch (e) {}

  let magicUser: MagicUserMetadata
  try {
    const did = magic.utils.parseAuthorizationHeader(req.headers.authorization)
    magic.token.validate(did)
    magicUser = await magic.users.getMetadataByToken(did)
  } catch (e) {
    clearUserSessionCookies(res)
    clearRegisteringUserSessionCookie(res)
    res.status(401).send(e.message)
    return
  }

  const registeredUser = await prisma.user.findUnique({
    where: { magicUserId: magicUser.issuer },
  })

  if (registeredUser) {
    // Problem is you can't do res.setHeader('Set-Cookie') more than once
    await setUserSessionCookies(res, registeredUser)
    clearRegisteringUserSessionCookie(res)
    return sendResponse(res, 200, { isRegisteredUser: true })
  }

  let registeringUser = await prisma.registeringUser.findUnique({
    where: {
      magicUserId: magicUser.issuer,
    },
  })
  if (!registeringUser) {
    registeringUser = await prisma.registeringUser.create({
      data: { magicUserId: magicUser.issuer, email: magicUser.email },
    })
  }

  clearUserSessionCookies(res)
  await setRegisteringUserSessionCookie(res, registeringUser)

  return sendResponse(res, 200, { isRegisteredUser: false })
}
