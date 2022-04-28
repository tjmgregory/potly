import { authedApi } from '@/lib/auth'

export default authedApi(async ({ res, user }) => {
  // TODO: Do a DB lookup to get other use data
  res.json({
    magicUser: user,
    name: 'Steve Buscemi',
    profileImgUrl:
      'https://cpng.pikpng.com/pngl/s/121-1210988_iphone-emoji-freetoedit-remixit-avocado-avocado-emoji-png.png',
    email: user.email,
  })
})
