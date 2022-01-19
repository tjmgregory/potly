import { NextApiRequest, NextApiResponse } from 'next'
import { validateUser } from '../../lib/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: Curry the outer default function to do the auth check ahead of time.
  // Akin to protectedRoute()((req, res) => { foo })
  // Would keep authing out of here and also mean the params get auto-typed.

  const user = await validateUser(req)
  if (!user) {
    console.error('Could not find user.')
    res.send(403)
    return
  }
  // TODO: Do a DB lookup to get other use data
  res.json({ user })
}
