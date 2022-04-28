import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { violet } from '@radix-ui/colors'
import styled from 'styled-components'

const Root = styled(AvatarPrimitive.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 45;
  height: 45;
  border-radius: 100%;
  background-color: ${(t) => t.theme.utils.m(1)};
`

const Image = styled(AvatarPrimitive.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

const Fallback = styled(AvatarPrimitive.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: ${violet.violet11};
  font-size: 15;
  line-height: 1;
  font-weight: 500;
`

const Avatar: React.FC<{ imgSrc?: string; name?: string }> = ({
  imgSrc,
  name,
}) => {
  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .reduce((prev, part) => `${prev}${part}`, '')
    : ''
  return (
    <Root>
      <Image src={imgSrc} />
      <Fallback>{initials}</Fallback>
    </Root>
  )
}

export default Avatar
