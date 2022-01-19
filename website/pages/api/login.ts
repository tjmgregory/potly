import { NextApiRequest, NextApiResponse } from 'next'
import { loginUserAndSetCookies, validateUser } from '../../lib/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()
  const user = await validateUser(req)
  if (user) {
    console.log('User already logged in.')
    res.send(200)
    return
  }

  await loginUserAndSetCookies(req, res)

  res.send(200)
}
