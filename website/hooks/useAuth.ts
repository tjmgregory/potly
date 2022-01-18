import { Magic } from '@magic-sdk/admin'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
const magic = new Magic(MAGIC_PUBLIC_KEY)

function fetcher(route) {
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null)
}

export default function useAuth() {
  // const [userEmail, setUserEmail] = useState(null)

  // useEffect(() => {
  //   if (!magic) {
  //     return
  //   }
  //   const checkLoggedIn = async () => {
  //     try {
  //       const isLoggedIn = await magic.user.isLoggedIn()
  //       if (isLoggedIn) {
  //         const { email } = await magic.user.getMetadata()
  //         setUserEmail(email)
  //       }
  //     } catch (err) {
  //       throw new Error('User is not logged in')
  //     }
  //   }
  //   checkLoggedIn()
  // }, [magic])

  return {
    userEmail: 'TODO',
  }
}
