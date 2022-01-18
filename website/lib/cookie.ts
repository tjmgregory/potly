import { serialize } from 'cookie'
import { NextApiResponse } from 'next'

const MAX_AGE = 60 * 60 * 8

function createCookie(name: string, data: string, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  })
}

export function setCookiesForResponse(
  res: NextApiResponse,
  cookieData: { key: string; value: string; options?: unknown }[]
) {
  res.setHeader(
    'Set-Cookie',
    cookieData.map(({ key, value, options }) =>
      createCookie(key, value, options)
    )
  )
}
