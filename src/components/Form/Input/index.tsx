import { useEffect, useId, useState } from 'react'
import { Icon as IconProps } from 'phosphor-react-native'
import {
  getTokens,
  InputProps as FieldProps,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui'

import { Field } from './Field'

import type { Mask } from '@/@types/mask'
import { Label } from '@/components/Form/Label'
import { Icon } from '@/components/input/Icon'
import { useMask } from '@/hooks/useMask'
import { getOnlyNumbers } from '@/utils/helpers/getOnlyNumbers'

type InputState = 'default' | 'success' | 'error'
type IconState = 'default' | 'disabled' | 'success' | 'error'

export interface InputProps extends FieldProps {
  label?: string
  subLabel?: string
  error?: string
  icon?: IconProps
  mask?: Mask
  max?: number
  isLoading?: boolean
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
  autoCapitalize,
  secureTextEntry,
  max,
  mask,
  isLoading = false,
  subLabel,
  error,
  onChangeText,
}: InputProps) {
  const [iconState, setIconState] = useState<IconState>('default')
  const [inputState, setInputState] = useState<InputState>('default')
  const maskText = useMask(mask)
  const id = useId()

  function handleFocus() {
    if (disabled || error) return

    setInputState('default')
    setInputState('default')
  }

  function handleBlur() {
    if (disabled || error) return

    setIconState('default')
    setInputState('default')
  }

  function handleTextChange(text: string) {
    if (disabled) return

    const maskedText = text

    if (onChangeText) {
      const value =
        keyboardType === 'numeric'
          ? getOnlyNumbers(maskedText).slice(0, max)
          : maskedText

      onChangeText(value)
    }

    if (!error) {
      setInputState('default')
      setIconState('default')
    }
  }

  useEffect(() => {
    if (error) {
      setInputState('error')
      setIconState('error')
    }

    if (!error) {
      setInputState('default')
      setIconState('default')
    }
  }, [error])

  return (
    <YStack gap={3}>
      {label && (
        <Label id={id} subLabel={subLabel}>
          {label}
        </Label>
      )}
      <XStack w={w} gap={4}>
        {InputIcon && (
          <Icon
            state={disabled ? 'disabled' : iconState}
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
          value={maskText(value ?? '')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleTextChange}
          disabled={disabled}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />
      </XStack>
      {error && (
        <Text color="$red500" fontSize={12}>
          {error}
        </Text>
      )}

      {isLoading && (
        <Spinner top="50%" right={12} position="absolute" color="$blue500" />
      )}
    </YStack>
  )
}
