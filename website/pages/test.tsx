import * as Accordion from '@radix-ui/react-accordion'

export default function Test() {
  return (
    <Accordion.Root type="single">
      <Accordion.Item value="a">
        <Accordion.Header>
          <Accordion.Trigger>Trigger text</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Header>
          <Accordion.Trigger>Trigger text 2</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
