import styled from 'styled-components'

const StyledInput = styled.input`
  position: absolute;
  inset: 0;
  border: none;
  color: inherit;
  background-color: inherit;
  outline: none;
  padding: ${(p) => p.theme.sizes.padding};

  &::placeholder {
    color: ${(p) => p.theme.colors.gray11};
  }
`

const Underline = styled.div`
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 0.5rem;
  border-bottom: 1px solid ${(p) => p.theme.colors.brand7};
`

const Wrapper = styled.div`
  position: relative;
  min-height: 3rem;
  height: 100%;
  min-width: 10rem;
  width: 100%;

  color: ${(p) => p.theme.colors.brand12};
  background-color: ${(p) => p.theme.colors.brand3};
  /* Needed so the outline transition doesn't blink on before fading in */
  outline: 1px solid ${(p) => p.theme.colors.brand7};

  &:hover {
    background-color: ${(p) => p.theme.colors.brand4};
    outline-color: ${(p) => p.theme.colors.brand8};
  }

  &:focus-within {
    background-color: ${(p) => p.theme.colors.brand5};
    outline-color: ${(p) => p.theme.colors.brand8};
  }

  &[aria-invalid='true'] {
    background-color: ${(p) => p.theme.colors.error3};
    outline-color: ${(p) => p.theme.colors.error8};

    & ${Underline} {
      border-color: ${(p) => p.theme.colors.error8};
    }

    &:hover {
      background-color: ${(p) => p.theme.colors.error4};
      outline-color: ${(p) => p.theme.colors.error8};
    }

    &:focus-within {
      background-color: ${(p) => p.theme.colors.error5};
      outline-color: ${(p) => p.theme.colors.error8};
    }
  }
`

// Necessary as styled-components input component takes a different ref type
// than is on a standard <input>
// https://stackoverflow.com/questions/68001975/why-cant-i-pass-props-when-i-use-input-type-in-react-styled-components
type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  ref?: React.ForwardedRef<HTMLInputElement>
}

const Input: React.FC<InputProps> = (props = {}) => (
  <Wrapper style={props.style} aria-invalid={props['aria-invalid']}>
    <StyledInput {...props} />
    <Underline />
  </Wrapper>
)

export default Input
