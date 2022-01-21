import { styled } from '@stitches/react'

const Span = styled('span')

// TODO: This is being debated as a good practice https://twitter.com/jjenzz/status/1423766700885954562
interface Props {
  as?: string
}

const Text: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return <Span {...props}>{children}</Span>
}

export default Text
