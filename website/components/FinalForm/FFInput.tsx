import { useField } from 'react-final-form'
import { Input } from '@/components/Input'

const FFInput: React.FC<React.ComponentProps<typeof Input>> = (props = {}) => {
  const { input, meta } = useField(props.name)
  return (
    <Input aria-invalid={meta.touched && meta.invalid} {...props} {...input} />
  )
}
export default FFInput
