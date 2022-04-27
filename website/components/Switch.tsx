import { Root, SwitchThumb } from '@radix-ui/react-switch'
import styled from 'styled-components'

const StyledRoot = styled(Root)`
  all: unset;
  display: block;
  position: relative;
  height: 30px;
  width 56px;
  border-radius: 100px;
  background-color: ${(p) => p.theme.colors.brand6};
  box-shadow: 0 2px 10px ${(p) => p.theme.colors.brand5};
  &:hover {
    box-shadow: 0 0 2px black;
    background-color: ${(p) => p.theme.colors.brand7};
  }
  &[data-state="checked"] {
    background-color: ${(p) => p.theme.colors.gray1};
    background-color: ${(p) => p.theme.colors.brand8};
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
