import prisma from '@/lib/prisma'
import { SignUpRequestBody } from '@/lib/types/api/sign-up'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  clearUserSessionCookies,
  getUserSessionTokenOrThrow,
  setUserSessionCookies,
} from '@/lib/userAuth'
import {
  clearRegisteringUserSessionCookie,
  getRegisteringUserSessionTokenOrThrow,
  RegisteringUserJWT,
} from '@/lib/registeringUserAuth'
import { User } from '@prisma/client'

async function setSuccessfulSignUpCookies(
  res: NextApiResponse,
  user: User
): Promise<void> {
  await setUserSessionCookies(res, user)
  clearRegisteringUserSessionCookie(res)
}

/**
 * Must be called with an existing registeringUserJWT, obtainable from /login
 * 200: User already exists.
 * 201: User created.
 * 401: No registeringUserJWT found - return to login.
 * 409: Already signed up and logged in.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await getUserSessionTokenOrThrow(req)
    clearRegisteringUserSessionCookie(res)
    res.status(409).send('User is already signed up.')
    return
  } catch (e) {}

  let registeringUserToken: RegisteringUserJWT
  try {
    registeringUserToken = await getRegisteringUserSessionTokenOrThrow(req)
  } catch (e) {
    clearUserSessionCookies(res)
    clearRegisteringUserSessionCookie(res)
    res
      .status(401)
      .send('No registering session found. User should reinitiate login.')
    return
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: registeringUserToken.registeringUser.id },
  })

  if (existingUser) {
    await setSuccessfulSignUpCookies(res, existingUser)
    res.status(200).send('This user is already signed up.')
    return
  }

  const body = req.body as SignUpRequestBody
  const newUser = await prisma.user.create({
    data: {
      ...registeringUserToken.registeringUser,
      preferredName: body.preferredName,
    },
  })

  await setSuccessfulSignUpCookies(res, newUser)

  res.status(201).send('Sign up complete.')
}
