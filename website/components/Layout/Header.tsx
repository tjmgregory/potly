import React from 'react'
import useUser from '@/hooks/useUser'
import styled from 'styled-components'
import useDarkMode from '@/hooks/useDarkMode'
import { Switch } from '@/components/Input'
import Link from 'next/link'
import { linkToLanding, linkToLogin } from '@/lib/links'
import { Avatar } from '@/components/Profile'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 60px;
  @media (max-width: 500px) {
    padding: 20px;
  }
`

const A = styled.a`
  text-transform: uppercase;
  text-decoration: none;
  font-size: ${(p) => p.theme.fontSizes[8]};
  font-weight: 700;
`

const AvatarWrapper = styled.div`
  width: 56px;
  height: 56px;
`

const Header: React.FunctionComponent<{}> = () => {
  const { user } = useUser()
  const { mode, toggleDarkMode } = useDarkMode()
  return (
    <StyledHeader>
      <Link href={linkToLanding()} passHref>
        <A>Potly</A>
      </Link>
      {mode && (
        <Switch defaultChecked={mode === 'dark'} onClick={toggleDarkMode} />
      )}
      {user ? (
        <AvatarWrapper>
          {/* TODO: Bring back the profile image url */}
          <Avatar name={user?.preferredName} />
        </AvatarWrapper>
      ) : (
        <Link href={linkToLogin()}>Login</Link>
      )}
    </StyledHeader>
  )
}

export default Header
