import React from 'react'
import useUser from '../hooks/useUser'
import { styled } from '../stitches.config'

const Header = styled('header', {
  textAlign: 'center',
  borderBlockEnd: '1px solid $gray400',
})

const H1 = styled('h1', {
  color: '$hiContrast',
  fontSize: '2rem',
  textTransform: 'uppercase',
  marginBlock: 0,
})

const A = styled('a', {
  textDecoration: 'none',
  color: 'inherit',
})

const UserBadge = styled('div', {
  position: 'absolute',
  top: 'auto',
  bottom: 'auto',
  right: '32px',
})

const _Header: React.FunctionComponent<{}> = () => {
  const user = useUser()
  return (
    <Header>
      <H1>
        <A href="/">Potly</A>
      </H1>
      {user ? <UserBadge>{user.email}</UserBadge> : <p>login</p>}
    </Header>
  )
}

export default _Header
