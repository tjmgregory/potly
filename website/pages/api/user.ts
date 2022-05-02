import { authedApi } from '@/lib/auth'
import prisma from '@/lib/prisma'

export default authedApi(async ({ res, user }) => {
  // TODO: Do a DB lookup to get other use data
  const users = await prisma.user.findMany()
  console.log('theo-7305', { users })

  res.json({
    magicUser: user,
    name: 'Steve Buscemi',
    profileImgUrl:
      'https://cpng.pikpng.com/pngl/s/121-1210988_iphone-emoji-freetoedit-remixit-avocado-avocado-emoji-png.png',
    email: user.email,
  })
})
