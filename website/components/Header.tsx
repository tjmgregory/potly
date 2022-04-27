import React from 'react'
import useUser from '@/hooks/useUser'
import styled from 'styled-components'
import useDarkMode from '@/hooks/useDarkMode'
import Switch from '@/components/Switch'

const StyledHeader = styled.header`
  text-align: center;
  border-block-end: 1px solid grey;
`

const H1 = styled.h1`
  text-transform: uppercase;
`

const A = styled.a`
  text-decoration: none;
  color: inherit;
`

const UserBadge = styled.div`
  position: absolute;
  top: auto;
  bottom: auto;
  right: 32px;
`

const Header: React.FunctionComponent<{}> = () => {
  const user = useUser()
  const { mode, toggleDarkMode } = useDarkMode()
  return (
    <StyledHeader>
      <H1>
        <A href="/">Potly</A>
      </H1>
      {user ? <UserBadge>{user.email}</UserBadge> : <p>login</p>}
      <Switch checked={mode === 'dark'} onClick={toggleDarkMode} />
    </StyledHeader>
  )
}

export default Header
