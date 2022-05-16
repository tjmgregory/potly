import { authedApi } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { SignUpRequestBody, SignUpResponse } from '@/lib/types/api/sign-up'

export default authedApi(async ({ magicUser: magicUser, req, res }) => {
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
})
