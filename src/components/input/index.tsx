import { useId, useState } from 'react'
import { MagnifyingGlass } from 'phosphor-react-native'
import { InputProps as TInputProps, Label, XStack, YStack } from 'tamagui'

import { Field } from './Field'

import { Icon } from '@/components/input/Icon'

type InputState = 'default' | 'success' | 'error'
type IconState = InputState | 'focus'

interface InputProps extends TInputProps {
  label: string
}

export function Input({ label, placeholder, w }: InputProps) {
  const [inputState, setInputState] = useState<InputState>('default')
  const [iconState, setIconState] = useState<IconState>('default')
  const id = useId()

  function handleFocus() {
    setIconState('focus')
  }

  function handleBlur() {
    setIconState('default')
  }

  return (
    <YStack gap={3}>
      <Label htmlFor={id} color="$gray800">
        {label}
      </Label>
      <XStack w={w} gap={4}>
        {/* <Icon state={iconState} icon={<MagnifyingGlass size={24} />} /> */}
        <Field
          state={inputState}
          id={id}
          placeholder={placeholder}
          w="100%"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </XStack>
    </YStack>
  )
}
