import { Magic, MagicUserMetadata } from '@magic-sdk/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies, setCookiesForResponse } from './cookie'

const MAGIC_DID_COOKIE_KEY = 'magicDID'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export async function loginUserAndSetCookies(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization)
  setSessionDID(res, did)
}

export function setSessionDID(res: NextApiResponse, magicDid: string): void {
  setCookiesForResponse(res, [
    { key: MAGIC_DID_COOKIE_KEY, value: magicDid },
    { key: 'authed', value: 'true', options: { httpOnly: false } },
  ])
}

function getSessionDID(req: NextApiRequest) {
  const cookies = parseCookies(req)
  const did = cookies[MAGIC_DID_COOKIE_KEY]
  if (!did) {
    throw new Error('No Magic session cookie found.')
  }
  return did
}

export async function validateUser(
  req: NextApiRequest
): Promise<MagicUserMetadata> {
  try {
    const did = getSessionDID(req)
    magic.token.validate(did)
    return magic.users.getMetadataByToken(did)
  } catch (e) {
    console.warn(`An error occured when authenticating user: ${e.message}`)
    return null
  }
}

type NextJSReqRes = (req: NextApiRequest, res: NextApiResponse) => Promise<void>
type AuthedNextJSReqRes = (params: {
  req: NextApiRequest
  res: NextApiResponse
  magicUser: MagicUserMetadata
}) => Promise<void>

/**
 * 403: No active Magic user session.
 */
export const authedApi: (callback: AuthedNextJSReqRes) => NextJSReqRes =
  (callback) => async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await validateUser(req)
    if (!user) {
      console.warn('Could not authenticate user.')
      res.status(403)
      return res.send(null)
    }
    return callback({ req, res, magicUser: user })
  }
