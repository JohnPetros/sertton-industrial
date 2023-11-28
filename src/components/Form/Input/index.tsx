import { useEffect, useId, useState } from 'react'
import { Icon as IconProps } from 'phosphor-react-native'
import {
  getTokens,
  InputProps as FieldProps,
  Text,
  XStack,
  YStack,
} from 'tamagui'

import { Field } from './Field'

import type { Mask } from '@/@types/mask'
import { Label } from '@/components/Form/Label'
import { Icon } from '@/components/input/Icon'
import { useMask } from '@/hooks/useMask'

type InputState = 'default' | 'success' | 'error'
type IconState = InputState | 'focus'

interface InputProps extends FieldProps {
  label?: string
  error?: string
  icon?: IconProps
  mask?: Mask
}

export function Input({
  icon: InputIcon,
  label,
  placeholder,
  w,
  autoCorrect,
  value,
  disabled,
  keyboardType,
  mask,
  error,
  onChangeText,
}: InputProps) {
  const [inputState, setInputState] = useState<InputState>('default')
  const [iconState, setIconState] = useState<IconState>('default')
  const [inputValue, setInputValue] = useState(value)
  const maskText = useMask(mask)
  const id = useId()

  function handleFocus() {
    if (disabled) return

    setInputState('default')
    setIconState('focus')
  }

  function handleBlur() {
    if (disabled) return

    setIconState('default')
  }

  function handleTextChange(text: string) {
    if (disabled) return

    const maskedText = maskText(text)
    setInputValue(maskedText)

    if (onChangeText) onChangeText(maskedText)
  }

  useEffect(() => {
    if (disabled) setInputValue('')
  }, [disabled])

  return (
    <YStack gap={3}>
      {label && <Label id={id}>{label}</Label>}
      <XStack w={w} gap={4}>
        {InputIcon && (
          <Icon
            state={disabled ? 'disabled' : 'default'}
            focus={'inactive'}
            icon={<InputIcon color={getTokens().color.gray800.val} size={28} />}
          />
        )}
        <Field
          id={id}
          flex={1}
          keyboardType={keyboardType}
          state={disabled ? 'disabled' : inputState}
          placeholder={placeholder}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleTextChange}
          disabled={disabled}
          autoCorrect={autoCorrect}
        />
      </XStack>
      {error && (
        <Text color="$red500" fontSize={12}>
          {error}
        </Text>
      )}
    </YStack>
  )
}
