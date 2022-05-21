import { Magic, MagicUserMetadata } from '@magic-sdk/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import {
  getUserSessionTokenOrThrow,
  setUserSessionCookies,
} from '@/lib/userAuth'
import { setRegisteringUserSessionCookie } from '@/lib/registeringUserAuth'

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    await getUserSessionTokenOrThrow(req)
    res.status(200).send('User already logged in.')
    return
  } catch (e) {}

  let magicUser: MagicUserMetadata
  try {
    const did = magic.utils.parseAuthorizationHeader(req.headers.authorization)
    magic.token.validate(did)
    magicUser = await magic.users.getMetadataByToken(did)
  } catch (e) {
    res.status(401).send(e.message)
    return
  }

  const registeredUser = await prisma.user.findUnique({
    where: { magicUserId: magicUser.issuer },
  })

  if (registeredUser) {
    await setUserSessionCookies(res, registeredUser)
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

  await setRegisteringUserSessionCookie(res, registeringUser)

  return sendResponse(res, 200, { isRegisteredUser: false })
}
