import { FFInput, FFSubmitButton } from '@/components/FinalForm'
import { Layout } from '@/components/Layout'
import { Label } from '@radix-ui/react-label'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { linkToDashboard, linkToLogin } from '@/lib/links'
import Cookies from 'js-cookie'

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

const SignUp: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get('REGISTERING_USER_SIGNAL_KEY')) {
      console.log('User has not initiated login flow.')
      router.push(linkToLogin())
    }
  }, [])

  const onSubmit = async (values: Record<string, any>) => {
    const result = await fetch('/api/sign-up', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(values),
    })
    if ([200, 201, 409].includes(result.status)) {
      router.push(linkToDashboard())
    } else if (result.status === 401) {
      router.push(linkToLogin())
    } else {
      console.error('Something unexpected happened.', await result.json())
    }
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
