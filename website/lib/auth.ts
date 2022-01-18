import { Magic, MagicUserMetadata } from '@magic-sdk/admin'
import Iron from '@hapi/iron'
import { addDays } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookiesForResponse } from './cookie'

const TOKEN_TTL_DAYS = 7
const TOKEN_COOKIE_KEY = 'api_token'

export interface UserJWT {
  magicUserId: string
  magicDID: string
  email: string
  createdAt: string
  expiresAt: string
}

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

function parseDidTokenFromHeaders(headers: NextApiRequest['headers']): string {
  return magic.utils.parseAuthorizationHeader(headers.authorization)
}

async function buildEncryptedUserJWTFromDID(did: string) {
  const userJwt = await buildUserJWT(did)
  return await Iron.seal(userJwt, process.env.IRON_SECRET_KEY, Iron.defaults)
}

async function buildUserJWT(did: string): Promise<UserJWT> {
  const { issuer, email } = await magic.users.getMetadataByToken(did)
  return {
    magicUserId: issuer,
    email,
    createdAt: new Date().toISOString(),
    expiresAt: addDays(new Date(), TOKEN_TTL_DAYS).toISOString(),
    magicDID: did,
  }
}

export async function buildEncryptedUserJWTFromRequest(
  req: NextApiRequest
): Promise<string> {
  const did = parseDidTokenFromHeaders(req.headers)
  return buildEncryptedUserJWTFromDID(did)
}

export function setJWTCookies(
  res: NextApiResponse,
  encryptedJwt: string
): void {
  setCookiesForResponse(res, [
    { key: TOKEN_COOKIE_KEY, value: encryptedJwt },
    { key: 'authed', value: 'true', options: { httpOnly: false } },
  ])
}

export async function validateUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<MagicUserMetadata> {
  try {
    const did = parseDidTokenFromHeaders(req.headers)
    magic.token.validate(did)
    return magic.users.getMetadataByToken(did)
  } catch (e) {
    res.send(403)
    throw e
  }
}
