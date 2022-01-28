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
  return cookies[MAGIC_DID_COOKIE_KEY]
}

export async function validateUser(
  req: NextApiRequest
): Promise<MagicUserMetadata> {
  try {
    const did = getSessionDID(req)
    magic.token.validate(did)
    return magic.users.getMetadataByToken(did)
  } catch (e) {
    console.error(e)
    return null
  }
}

type NextJSReqRes = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export const authedApi: (callback: NextJSReqRes) => NextJSReqRes = (
  callback: NextJSReqRes
) => async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await validateUser(req)
  if (!user) {
    console.error('Could not find user.')
    res.send(403)
    return
  }
  return callback(req, res)
}
