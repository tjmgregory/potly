import Iron from '@hapi/iron'

const IRON_SECRET_KEY = process.env.IRON_SECRET_KEY
const IRON_CONFIGURATION = Iron.defaults

export function seal(item: any): Promise<any> {
  return Iron.seal(item, IRON_SECRET_KEY, IRON_CONFIGURATION)
}

export function unseal(item: any): Promise<any> {
  return Iron.unseal(item, IRON_SECRET_KEY, IRON_CONFIGURATION)
}
