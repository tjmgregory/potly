import { NextApiRequest, NextApiResponse } from 'next'
import { validateUser } from '../../lib/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await validateUser(req, res)
  // TODO: Do a DB lookup to get other use data
  res.json(user)
}
