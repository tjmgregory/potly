import Layout from '@/components/layout'
import { Field, Form, useField } from 'react-final-form'
import styled from 'styled-components'

// Necessary as styled-components input component takes a different ref type
// than is on a standard <input>
// https://stackoverflow.com/questions/68001975/why-cant-i-pass-props-when-i-use-input-type-in-react-styled-components
type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  ref?: React.ForwardedRef<HTMLInputElement>
}

const Input = styled.input`
  position: absolute;
  inset: 0;
  border: none;
  color: inherit;
  background-color: inherit;
  outline: none;
  padding: 0.5rem 1rem;

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
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`

const Question = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const QuestionTitle = styled.label`
  font-size: ${(p) => p.theme.fontSizes[2]};
`

const SignUp: React.FC = () => {
  // TODO: Kick you to login if you haven't initated signup via /login and thereby don't have a SigningUpUser
  return (
    <Layout>
      <h1>Sign up</h1>
      <Form
        onSubmit={() => {}}
        validate={(values) => {
          const errors: any = {}
          if (!values.preferredName) {
            errors.preferredName = 'Required'
          }

          if (!values.email) {
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
            <button type="submit">Submit</button>
          </StyledForm>
        )}
      />
    </Layout>
  )
}
export default SignUp
