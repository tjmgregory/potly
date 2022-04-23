import React from 'react'
import useUser from '@/hooks/useUser'
import styled from 'styled-components'

const StyledHeader = styled.header`
  text-align: 'center';
  border-block-end: '1px solid $gray400';
`

const H1 = styled.h1`
  /* color: '$hiContrast'; */
  /* font-size: '2rem'; */
  /* text-transform: 'uppercase'; */
  /* margin-block: 0; */
`

const A = styled.a`
  text-decoration: 'none';
  color: 'inherit';
`

const UserBadge = styled.div`
  position: 'absolute';
  top: 'auto';
  bottom: 'auto';
  right: '32px';
`

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
