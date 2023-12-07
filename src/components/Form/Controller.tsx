import { FunctionComponent } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { Icon } from 'phosphor-react-native'

import { InputProps } from '@/components/Form/Input'

interface ControlledInputProps extends UseControllerProps {
  input: FunctionComponent<InputProps>
  error: string | undefined
  icon: Icon
  onChangeText: (value: string, name: string) => void
}

export function ControlledInput<FormType extends FieldValues>({
  control,
  name,
  error,
  icon,
  input: Input,
  onChangeText,
  ...inputProps
}: ControlledInputProps & UseControllerProps<FormType> & InputProps) {
  function handleInputChange(
    onFormChange: (value: string) => void,
    value: string,
    name: string
  ) {
    onFormChange(value)
    if (onChangeText) onChangeText(value, name)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, name } }) => (
        <Input
          {...inputProps}
          label="Confirmação de senha"
          icon={icon}
          value={value}
          onChangeText={() => handleInputChange(onChange, value, name)}
          error={error}
        />
      )}
    />
  )
}
