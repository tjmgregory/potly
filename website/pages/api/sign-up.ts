import { authedApi } from '@/lib/userAuth'
import prisma from '@/lib/prisma'
import { SignUpRequestBody, SignUpResponse } from '@/lib/types/api/sign-up'
import { v4 as uuid } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const existingUser = await prisma.user.findUnique({
    where: { magicUserId: magicUser.issuer },
  })

  if (existingUser) {
    res.status(409).send('A user for this Magic user already exists.')
    return
  }

  const body = req.body as SignUpRequestBody
  const prismaUser = await prisma.user.create({
    data: {
      // TODO: Use RegisteringUser id
      id: uuid(),
      email: magicUser.email,
      preferredName: body.preferredName,
      magicUserId: magicUser.issuer,
    },
  })

  const response: SignUpResponse = {
    user: {
      id: prismaUser.id,
      email: prismaUser.email,
      preferredName: prismaUser.preferredName,
    },
  }
  res.status(201).json(response)
}
