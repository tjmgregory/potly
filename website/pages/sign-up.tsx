import { FFInput } from '@/components/FinalForm'
import Layout from '@/components/layout'
import { Label } from '@radix-ui/react-label'
import { Form, useFormState } from 'react-final-form'
import styled from 'styled-components'

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

// Personally customised, probably a terrible idea.
const emailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/
)

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
            errors.email = 'Required'
          }
          if (values.email && !(values.email as string).match(emailRegex)) {
            errors.email = 'Invalid email'
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
