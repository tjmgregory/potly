import React from 'react'
import useUser from '@/hooks/useUser'
import { styled } from '../stitches.config'

const StyledHeader = styled('header', {
  textAlign: 'center',
  borderBlockEnd: '1px solid $gray400',
})

const H1 = styled('h1', {
  // color: '$hiContrast',
  // fontSize: '2rem',
  // textTransform: 'uppercase',
  // marginBlock: 0,
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

const Header: React.FunctionComponent<{}> = () => {
  const user = useUser()
  return (
    <StyledHeader>
      <H1>
        <A href="/">Potly</A>
      </H1>
      {user ? <UserBadge>{user.email}</UserBadge> : <p>login</p>}
    </StyledHeader>
  )
}

export default Header
