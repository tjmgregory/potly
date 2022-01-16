import React from 'react'
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

const _Header: React.FunctionComponent<{}> = () => {
  return (
    <Header>
      <H1>
        <A href="/">Potly</A>
      </H1>
    </Header>
  )
}

export default _Header
