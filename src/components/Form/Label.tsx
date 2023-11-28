import { Label as Text } from 'tamagui'

interface Props {
  id: string
  children: string
}

export function Label({ children, id }: Props) {
  return (
    <Text htmlFor={id} color="$gray800" textTransform="uppercase">
      {children}
    </Text>
  )
}