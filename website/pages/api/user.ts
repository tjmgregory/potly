import { NextApiRequest, NextApiResponse } from 'next'
import { validateUser } from '../../lib/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: If this doesn't work because of throwing after sending a 403, can
  // instead curry the outer default function to do the auth check ahead of time.
  // Might be nice to do anyway, akin to protectedRoute()((req, res) => { foo })
  // Would keep authing out of here and also mean the params get auto-typed.

  console.log('theo-24868')
  const user = await validateUser(req)
  if (!user) {
    res.send(403)
    return
  }
  console.log('theo-24878', user)
  // TODO: Do a DB lookup to get other use data
  res.json({ user })
}
