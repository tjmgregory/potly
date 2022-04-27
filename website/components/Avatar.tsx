import AvatarPrimitive from '@radix-ui/react-avatar'
import { violet, blackA } from '@radix-ui/colors'
import styled from 'styled-components'

// TODO: This is undefined
console.log(AvatarPrimitive)
export const Avatar = styled(AvatarPrimitive.Root)`
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

export const AvatarImage = styled(AvatarPrimitive.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

export const AvatarFallback = styled(AvatarPrimitive.Fallback)`
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
