import React from 'react'
import {styled} from '../stitches.config'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'


const Header = styled('header', )

const _Header: React.FunctionComponent<{}> = () => {
  return (
    <header>
      <div>
        <h1>Potly</h1>
        {/* <Avatar> */}
        {/*   <AvatarImage src="/images/profile_picture.gif" alt="Theo Gregory" /> */}
        {/*   <AvatarFallback delayMs={600}>TG</AvatarFallback> */}
        {/* </Avatar> */}
      </div>
    </header>
  )
}

export default _Header
