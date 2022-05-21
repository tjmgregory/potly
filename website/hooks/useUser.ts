import { User } from '@/lib/types/profile/user'
import { useEffect } from 'react'
import useSWR from 'swr'

class ApiError extends Error {
  info: string
  status: number
}

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new ApiError('An error occured while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

interface Props {
  ifNotFound?: () => void
}

function useUser({ ifNotFound }: Props = {}): {
  loading: boolean
  user: User | null
  error?: ApiError
} {
  const { data: user, error } = useSWR('/api/user', fetcher)
  const finishedLoading = Boolean(user)

  useEffect(() => {
    if (error || (finishedLoading && !user)) {
      console.log('Failed to fetch user', { error, finishedLoading, user })
      ifNotFound?.()
    }
  }, [user, finishedLoading, error])

  return {
    loading: !finishedLoading,
    user: error ? null : (user as unknown as User),
    error,
  }
}

export default useUser
