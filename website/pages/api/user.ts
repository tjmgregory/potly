import { authedApi } from '@/lib/auth'
import prisma from '@/lib/prisma'

/**
 * 404: User could not be found for magic session.
 */
export default authedApi(async ({ res, magicUser }) => {
  // TODO: Do a DB lookup to get other use data
  const user = await prisma.user.findUnique({
    where: { magicUserId: magicUser.issuer },
  })

  if (!user) {
    res.status(404).send('User for this magic session could not be found.')
    return
  }

  res.json({
    magicUser: magicUser,
    name: user.preferredName,
    email: magicUser.email,
  })
})
