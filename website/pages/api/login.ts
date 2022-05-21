import { Magic, MagicUserMetadata } from '@magic-sdk/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getUserSessionToken, setUserSessionCookies } from '@/lib/userAuth'
import { setRegisteringSessionCookie } from '@/lib/registeringUserAuth'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export interface LoginResponse {
  isRegisteredUser: boolean
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    await getUserSessionToken(req)
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
    const response: LoginResponse = {
      isRegisteredUser: true,
    }
    res.status(200).json(response)
    return
  }

  let registeringUser = await prisma.registeringUser.findUnique({
    where: {
      magicUserId: magicUser.issuer,
    },
  })
  if (!registeringUser) {
    registeringUser = await prisma.registeringUser.create({
      data: { magicUserId: magicUser.issuer },
    })
  }

  await setRegisteringSessionCookie(res, registeringUser)
}
