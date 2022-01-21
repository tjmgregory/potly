import Text from './Text'

type SizeVariant = 1 | 2 | 3 | 4 | 5 | 6

interface Props {
  size?: SizeVariant
}

const Heading: React.FunctionComponent<Props> = ({
  children,
  size = 1,
  ...childProps
} = {}) => {
  return (
    <Text as={`h${size}`} {...childProps}>
      {children}
    </Text>
  )
}

export default Heading
