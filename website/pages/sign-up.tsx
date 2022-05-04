import Layout from '@/components/layout'
import { Field, Form } from 'react-final-form'

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
            <Field name="preferredName">
              {({ input, meta }) => (
                <div>
                  <label>What should we call you?</label>
                  <input {...input} placeholder="Steve" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <label>How should we contact you?</label>
                  <span>Don't worry, we don't send much</span>
                  <input {...input} placeholder="steve@buscemi.com" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </Layout>
  )
}
export default SignUp
