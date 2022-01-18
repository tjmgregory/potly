import { NextApiRequest, NextApiResponse } from 'next'
import { buildEncryptedUserJWTFromRequest, setJWTCookies } from '../../lib/auth'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()
  const encryptedJWT = await buildEncryptedUserJWTFromRequest(req)
  setJWTCookies(res, encryptedJWT)
  res.send(200)
}
