import { useId, useState } from 'react'
import { InputProps as TInputProps, XStack, YStack } from 'tamagui'

import { Field } from './Field'

import type { Mask } from '@/@types/mask'
import { Label } from '@/components/Form/Label'
import { Icon } from '@/components/input/Icon'
import { useMask } from '@/hooks/useMask'

type InputState = 'default' | 'success' | 'error'
type IconState = InputState | 'focus'

interface InputProps extends TInputProps {
  label?: string
  mask?: Mask
}

export function Input({
  label,
  placeholder,
  w,
  autoCorrect,
  value,
  disabled,
  keyboardType,
  mask,
  onChangeText,
}: InputProps) {
  const [inputState, setInputState] = useState<InputState>('default')
  const [iconState, setIconState] = useState<IconState>('default')
  const maskText = useMask(mask)
  const id = useId()

  function handleFocus() {
    setInputState('default')
    setIconState('focus')
  }

  function handleBlur() {
    setIconState('default')
  }

  function handleTextChange(text: string) {
    if (onChangeText) onChangeText(maskText(text))
  }

  return (
    <YStack gap={3}>
      {label && <Label id={id}>{label}</Label>}
      <XStack w={w} gap={4}>
        {/* <Icon state={iconState} icon={<MagnifyingGlass size={24} />} /> */}
        <Field
          keyboardType={keyboardType}
          state={inputState}
          id={id}
          placeholder={placeholder}
          value={value}
          w="100%"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleTextChange}
          disabled={disabled}
          autoCorrect={autoCorrect}
        />
      </XStack>
    </YStack>
  )
}
