import { Text, TextProps } from 'tamagui'

interface BrandProps extends TextProps {
  children: string
}

export function Brand({ children, ...rest }: BrandProps) {
  return (
    <Text color="$gray300" textTransform="uppercase" fontSize={12} {...rest}>
      {children}
    </Text>
  )
}
