import { Root, SwitchThumb } from '@radix-ui/react-switch'
import styled from 'styled-components'

const StyledRoot = styled(Root)`
  all: unset;
  display: block;
  position: relative;
  height: 30px;
  width 56px;
  border-radius: 100px;
  background-color: ${(p) => p.theme.colors.brand3};
  /* Box shadow defaults to color */
  box-shadow: 0 0 4px;
  color: ${(p) => p.theme.colors.brand7};
  &:hover {
    background-color: ${(p) => p.theme.colors.brand4};
    color: ${(p) => p.theme.colors.brand7};
  }
  &[data-state="checked"] {
    background-color: ${(p) => p.theme.colors.brand5};
  }
`

const StyledThumb = styled(SwitchThumb)`
  display: block;
  position: relative;
  width: 26px;
  height: 26px;
  left: 3px;
  transition: transform 400ms;
  background-color: ${(p) => p.theme.colors.brand12};
  border-radius: 100px;
  &[data-state='checked'] {
    transform: translateX(24px);
  }
`

const Switch: React.FC<React.ComponentProps<typeof StyledRoot>> = (props) => (
  <StyledRoot {...props}>
    <StyledThumb />
  </StyledRoot>
)

export default Switch
