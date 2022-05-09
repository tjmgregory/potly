import { FFInput, FFSubmitButton } from '@/components/FinalForm'
import Layout from '@/components/layout'
import { Label } from '@radix-ui/react-label'
import { Form } from 'react-final-form'
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
            <FFSubmitButton
              type="submit"
              aria-describedby="preferredName email"
            >
              Submit
            </FFSubmitButton>
          </StyledForm>
        )}
      />
    </Layout>
  )
}
export default SignUp
