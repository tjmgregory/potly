import { MagicUserMetadata } from 'magic-sdk'
import { useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => ({ user: data?.user || null }))

interface Props {
  ifNotFound?: () => void
}

type User = MagicUserMetadata

export default function useUser({ ifNotFound }: Props = {}): User {
  const { data, error } = useSWR('/api/user', fetcher)
  const user = data?.user
  const finishedLoading = Boolean(data)

  useEffect(() => {
    if (error || (finishedLoading && !user)) {
      console.log('Failed to fetch user', { error, finishedLoading, user })
      ifNotFound?.()
    }
  }, [user, finishedLoading])

  return error ? null : user
}
