import { FFInput, FFSubmitButton } from '@/components/FinalForm'
import { Layout } from '@/components/Layout'
import { SignUpRequestBody } from '@/lib/types/api/sign-up'
import { Label } from '@radix-ui/react-label'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import useSWR from 'swr'
import { useRouter } from 'next/router'

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

class ApiError extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super(`Received code: ${statusCode} | ${message}`)
  }
}

const submitSignUp = async ({ body }: { body: SignUpRequestBody }) => {
  const result = await fetch('/api/sign-up', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  })
  if (result.status > 299) {
    throw new ApiError(result.status, JSON.stringify(result.body))
  }
  return result.json()
}

const SignUp: React.FC = () => {
  // TODO: Kick you to login if you haven't initated signup via /login and thereby don't have a SigningUpUser
  const router = useRouter()

  const onSubmit = async (values: Record<string, any>) => {
    try {
      await submitSignUp({ body: { preferredName: values.preferredName } })
    } catch (e) {
      // TODO: Add toast
      console.log(e.message)
    }
    router.push('/dashboard')
  }

  return (
    <Layout>
      <h1>Sign up</h1>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: any = {}
          if (!values.preferredName) {
            errors.preferredName = 'Required'
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
