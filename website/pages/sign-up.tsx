import Layout from '@/components/layout'
import { Label } from '@radix-ui/react-label'
import { Field, Form, useField, useFormState } from 'react-final-form'
import styled from 'styled-components'

const Input = styled.input`
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

const FFInput: React.FC<InputProps> = (props = {}) => {
  const { input, meta } = useField(props.name)
  return (
    <Wrapper style={props.style} aria-invalid={meta.touched && meta.invalid}>
      <Input {...props} {...input} />
      <Underline />
    </Wrapper>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Question = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const QuestionTitle = styled(Label)`
  font-size: ${(p) => p.theme.fontSizes[2]};
`

const Button = styled.button`
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
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  ref?: React.ForwardedRef<HTMLInputElement>
}

const FFButton: React.FC<ButtonProps> = (props = {}) => {
  // TODO: Make this performant by only subbing to the needed keys here
  const { valid } = useFormState()
  // Using the 'disabled' prop would make the button disappear from screen readers, so instead we mimic it.
  // https://haltersweb.github.io/Accessibility/submit-disabling.html
  return <Button aria-disabled={!valid} {...props} />
}

const SignUp: React.FC = () => {
  // TODO: Kick you to login if you haven't initated signup via /login and thereby don't have a SigningUpUser
  return (
    <Layout>
      <h1>Sign up</h1>
      <Form
        onSubmit={() => {
          console.log('we submitted')
        }}
        validate={(values) => {
          const errors: any = {}
          if (!values.preferredName) {
            errors.preferredName = 'Required'
          }

          if (!values.email) {
            // TODO: Need to do proper email validation to get FinalForm to work.
            errors.email = 'Required'
          }

          return errors
        }}
        render={({ handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Question>
              <QuestionTitle htmlFor="preferredName">
                What should we call you?
              </QuestionTitle>
              <FFInput
                id="preferredName"
                name="preferredName"
                placeholder="Steve"
              />
            </Question>
            <Question>
              <QuestionTitle htmlFor="email">
                How should we contact you?
              </QuestionTitle>
              <FFInput
                id="email"
                name="email"
                type="email"
                placeholder="steve@buscemi.com"
              />
            </Question>
            <FFButton type="submit" aria-describedby="preferredName email">
              Submit
            </FFButton>
          </StyledForm>
        )}
      />
    </Layout>
  )
}
export default SignUp
