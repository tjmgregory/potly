import Iron from '@hapi/iron'
import { Magic } from 'magic-sdk'
import CookieService from '../../lib/cookie'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export default async (req, res) => {
  let user
  try {

  } catch (error) {
    res.status(401).end()
  }

  res.json(user)
}
