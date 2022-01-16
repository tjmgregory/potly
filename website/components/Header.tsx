import React from 'react'
import { styled } from '../stitches.config'

const Header = styled('header', { textAlign: 'center' })

const H1 = styled('h1', {
  color: '$hiContrast',
  fontSize: '2rem',
})

const _Header: React.FunctionComponent<{}> = () => {
  return (
    <Header>
      <H1>Potly</H1>
    </Header>
  )
}

export default _Header
