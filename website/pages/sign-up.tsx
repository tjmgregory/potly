import Layout from '@/components/layout'
import { Field, Form, useField } from 'react-final-form'
import styled from 'styled-components'

// Necessary as styled-components input component takes a different ref type
// than is on a standard <input>
// https://stackoverflow.com/questions/68001975/why-cant-i-pass-props-when-i-use-input-type-in-react-styled-components
type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  ref?: React.ForwardedRef<HTMLInputElement>
}

// TODO: Make this stylish: nice inside underline, outline, error handling
const Input = styled.input`
  border: none;
  color: ${(t) => t.theme.colors.brand11};
  background-color: ${(t) => t.theme.colors.brand3};

  &:hover {
    background-color: ${(t) => t.theme.colors.brand4};
  }
  &:focus {
    background-color: ${(t) => t.theme.colors.brand5};
  }
`

const FFInput: React.FC<InputProps> = (props) => {
  const { input, meta } = useField(props.name)
  return <Input {...props} {...input} />
}

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
          <form onSubmit={handleSubmit}>
            <div>
              <label>What should we call you?</label>
              <FFInput name="preferredName" placeholder="Steve" />
            </div>
            <div>
              <label>How should we contact you?</label>
              <span>Don't worry, we don't send much</span>
              <FFInput
                name="email"
                type="email"
                placeholder="steve@buscemi.com"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </Layout>
  )
}
export default SignUp
