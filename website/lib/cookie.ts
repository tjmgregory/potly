import { serialize, parse, CookieSerializeOptions } from 'cookie'
import { subDays } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

const MAX_AGE = 60 * 60 * 8

function createCookie(
  name: string,
  data: string,
  options: CookieSerializeOptions = {}
): string {
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

type CookieData = Parameters<NextApiResponse['setHeader']>[1]
function cookieDataAsList(data: CookieData): readonly string[] {
  return ['number', 'string'].includes(typeof data)
    ? ['' + data]
    : (data as readonly string[])
}

// This is necessary as it appears you cannot call res.setHeader with the same key twice
// as one will overwrite the other.
function appendOrSetHeader(
  res: NextApiResponse,
  key: string,
  data: CookieData
): void {
  const existingHeader = res.getHeader(key)
  let newValue: CookieData
  if (existingHeader === undefined || existingHeader === []) {
    newValue = data
  } else {
    newValue = [...cookieDataAsList(existingHeader), ...cookieDataAsList(data)]
  }
  res.setHeader(key, newValue)
}

export function setCookiesForResponse(
  res: NextApiResponse,
  cookieData: { key: string; value: string; options?: CookieSerializeOptions }[]
): void {
  const cookies = cookieData.map(({ key, value, options }) =>
    createCookie(key, value, options)
  )
  appendOrSetHeader(res, 'Set-Cookie', cookies)
}

export function parseCookies(req: NextApiRequest): Record<string, string> {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function deleteCookie(res: NextApiResponse, key: string): void {
  appendOrSetHeader(
    res,
    'Set-Cookie',
    serialize(key, '', { expires: subDays(new Date(), 1) })
  )
}
