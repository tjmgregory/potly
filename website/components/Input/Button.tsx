import styled from 'styled-components'

const StyledButton = styled.button`
  color: inherit;
  background-color: ${(p) => p.theme.colors.brand3};
  border: 1px solid ${(p) => p.theme.colors.brand7};
  padding: ${(p) => p.theme.sizes.padding};
  cursor: pointer;

  &[aria-disabled='true'] {
    cursor: default;
    background-color: ${(p) => p.theme.colors.gray3};
    border-color: ${(p) => p.theme.colors.gray7};
    color: ${(p) => p.theme.colors.gray11};
  }

  &[aria-disabled='false'] {
    &:hover {
      background-color: ${(p) => p.theme.colors.brand4};
      border-color: ${(p) => p.theme.colors.brand8};
    }
  }
`

// Necessary as styled-components input component takes a different ref type
// than is on a standard <button>
// https://stackoverflow.com/questions/68001975/why-cant-i-pass-props-when-i-use-input-type-in-react-styled-components
type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'aria-disabled'
> & {
  ref?: React.ForwardedRef<HTMLInputElement>
}

/**
 * `disabled` should be used to control the disabled state of this component.
 * This will be achieved for you in a a11y complete manner, without the need
 * for you to supply aria-disabled.
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { disabled, ...restProps } = props
  // Using the 'disabled' prop would make the button disappear from screen readers, so instead we mimic it.
  // https://haltersweb.github.io/Accessibility/submit-disabling.html
  return <StyledButton {...restProps} aria-disabled={disabled} />
}

export default Button
