import { Magic, MagicUserMetadata } from 'magic-sdk'
import { useEffect, useState } from 'react'

const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
const magic = new Magic(MAGIC_PUBLIC_KEY)

type Response =
  | { isLoggedIn: false }
  | { isLoggedIn: true; user: MagicUserMetadata }

export default function useMagicUser() {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<Response>(null)

  useEffect(() => {
    const getUser = async () => {
      const loggedIn = await magic.user.isLoggedIn()
      if (!loggedIn) {
        setResponse({ isLoggedIn: false })
        setLoading(false)
        return
      }

      const userMetadata = await magic.user.getMetadata()
      setResponse({ isLoggedIn: true, user: userMetadata })
      setLoading(false)
    }
    getUser()
  }, [])

  return { user: response, loading }
}
