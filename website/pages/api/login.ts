import { NextApiRequest, NextApiResponse } from 'next'
import { loginUserAndSetCookies, validateUser } from '@/lib/auth'
import prisma from '@/lib/prisma'

export interface LoginResponse {
  isRegisteredUser: boolean
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()
  const user = await validateUser(req)

  if (user) {
    console.log('User already logged in.')

    const registeredUser = await prisma.user.findUnique({
      where: { magicUserId: user.issuer },
    })

    res.status(200)
    const response: LoginResponse = {
      isRegisteredUser: Boolean(registeredUser),
    }
    res.json(response)
    return
  }

  await loginUserAndSetCookies(req, res)

  res.send(200)
}
