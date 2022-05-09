import React from 'react'
import { useFormState } from 'react-final-form'
import Button from '../Button'

type Props = React.ComponentProps<typeof Button>

const FFSubmitButton: React.FunctionComponent<Props> = (props) => {
  // TODO: Make this performant by only subbing to the needed keys here
  const { valid } = useFormState()
  return <Button disabled={!valid} {...props} />
}

export default FFSubmitButton
