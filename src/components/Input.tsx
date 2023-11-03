import { useId } from 'react'
import { Input as TInput, Label } from 'tamagui';

interface InputProps {
  label: string
}

export function Input({ label }: InputProps) {
  const id = useId()

  return (
    <>
      <Label htmlFor={id} color="$gray800">
        {label}
      </Label>
      <TInput
        id={id}
        bg="$gray100"
        color="$gray500"
        focusStyle={{
          color: '$gray900',
        }}
        py={12}
        px={8}
        borderColor="$blue600"
        borderBottomWidth={2}
        mt={12}
      />
    </>
  )
}
