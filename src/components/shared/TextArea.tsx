import { useId, useState } from 'react'
import { Text, TextArea as Field, TextAreaProps, YStack } from 'tamagui'

import { Label } from './Label'

interface FieldProps extends TextAreaProps {
  label?: string
}

const MAX_LENGTH = 250

export function TextArea({ label, ...rest }: FieldProps) {
  const [characters, setCaracters] = useState(MAX_LENGTH)
  const id = useId()

  function handleChange(value: string) {
    setCaracters(MAX_LENGTH - value.length)
  }

  return (
    <YStack>
      {label && <Label id={id}>{label}</Label>}
      <Field
        px={12}
        py={0}
        bg="$gray100"
        onChangeText={handleChange}
        maxLength={MAX_LENGTH}
        {...rest}
      />
      <Text fontSize={12} color="$gray300">
        {characters} caracteres
      </Text>
    </YStack>
  )
}
