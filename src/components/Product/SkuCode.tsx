import { Text, TextProps } from 'tamagui'

interface SkuCodeProps extends TextProps {
  children: number
}

export function SkuCode({ children, ...rest }: SkuCodeProps) {
  return (
    <Text fontSize={12} {...rest} fontWeight="600" color="$blue500">
      {children}
    </Text>
  )
}
