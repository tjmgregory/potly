import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => ({ user: data?.user || null }))

interface Props {
  redirectToIfNotFound: string
  redirectIfFound?: boolean
}

export default function useUser({
  redirectToIfNotFound,
  redirectIfFound = false,
}: Props) {
  const { data, error } = useSWR('/api/user', fetcher)
  const user = data?.user
  const requestSuceeded = Boolean(data)

  useEffect(() => {
    if (!requestSuceeded) {
      console.log(error)
      return
    }

    if (!user || (user && redirectIfFound)) {
      Router.push(redirectToIfNotFound)
    }
  }, [user, requestSuceeded, redirectToIfNotFound, redirectIfFound])

  return error ? null : user
}
