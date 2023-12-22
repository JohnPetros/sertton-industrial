import { Controller, UseControllerProps } from 'react-hook-form'

import { Input, InputProps } from '@/components/Form/Input'

interface ControlledInputProps extends InputProps {}

export function ControlledInput({
  name,
  control,
  ...inputProps
}: ControlledInputProps & UseControllerProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, name } }) => (
        <Input
          value={value}
          onChangeText={(email) => handleInputChange(onChange, email, name)}
          {...inputProps}
        />
      )}
    />
  )
}
