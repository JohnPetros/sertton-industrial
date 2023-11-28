import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useState,
} from 'react'
import { ActivityIndicator } from 'react-native'
import { CaretDown, Check, X } from 'phosphor-react-native'
import {
  Adapt,
  getTokens,
  Select as S,
  Separator,
  Sheet,
  View,
  XStack,
  YStack,
} from 'tamagui'
import { Text } from 'tamagui'
import { Label } from 'tamagui'

import { Button } from '@/components/Button'

type DefaultValue = 'Selecionar'

const DEFAULT_VALUE: DefaultValue = 'Selecionar'

export type SelectRef = {
  value: string
  reset: () => void
  open: () => void
}

interface SelectProps {
  items: string[]
  defaultValue: string | DefaultValue
  width: number | string
  onChange: (value: string) => void
  label?: string
  ariaLabel?: string
  isDisable?: boolean
  hasError?: boolean
}

export const SelectComponent = (
  {
    label,
    ariaLabel,
    items,
    defaultValue,
    width,
    isDisable = false,
    hasError = false,
    onChange,
  }: SelectProps,
  ref: ForwardedRef<SelectRef>
) => {
  const [seletedValue, setSelectedValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(hasError)
  const id = useId()

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function reset() {
    setSelectedValue(DEFAULT_VALUE)
  }

  function handleChangeValue(value: string) {
    setIsLoading(true)

    setSelectedValue(value)
  }

  function handleOpenChage(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  useImperativeHandle(ref, () => {
    return {
      value: seletedValue === DEFAULT_VALUE ? '' : seletedValue,
      reset,
      open,
    }
  })

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsOpen(false)
        setIsLoading(false)
        setError(false)
        onChange(seletedValue)
      }, 50)
    }
  }, [isLoading, seletedValue])

  useEffect(() => {
    setError(hasError)
  }, [hasError])

  return (
    <YStack
      aria-label={ariaLabel}
      w={width}
      alignItems="center"
      opacity={isDisable ? 0.3 : 1}
    >
      {label && id && (
        <Label
          htmlFor={id}
          color="#111"
          fontSize={12}
          textTransform="uppercase"
        >
          {label}
        </Label>
      )}
      <S
        defaultValue={defaultValue}
        onValueChange={handleChangeValue}
        open={isOpen}
        value={seletedValue}
      >
        <S.Trigger
          id={id}
          borderWidth={1}
          borderColor={error ? '$red700' : '$gray400'}
          borderRadius={4}
          fontSize={14}
          bg={error ? '$red50' : '$gray50'}
          w={width}
          disabled={isDisable}
          onStartShouldSetResponder={() => {
            open()
            return true
          }}
        >
          {seletedValue}
          <CaretDown size={16} color={getTokens().color.gray800.val} />
        </S.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            modal
            animation="quick"
            dismissOnSnapToBottom
            onOpenChange={handleOpenChage}
          >
            <Sheet.Frame flexDirection="column">
              <Adapt.Contents />
            </Sheet.Frame>
          </Sheet>
        </Adapt>

        <S.Content>
          <S.Viewport>
            <XStack alignItems="center" justifyContent="space-between" mb={8}>
              <Text p={12} fontSize={16} fontWeight="600" color="$blue800">
                Selecione uma opção:
              </Text>
              <Button background="transparent" p={12} onPress={close}>
                <X color={getTokens().color.blue800.val} />
              </Button>
            </XStack>
            <S.Group
              separator={
                <View px={12}>
                  <Separator
                    bg="$gray400"
                    alignSelf="stretch"
                    vertical={false}
                  />
                </View>
              }
            >
              {items.map((item, index) => (
                <S.Item
                  key={index}
                  index={index}
                  value={item}
                  alignItems="center"
                >
                  <S.ItemText fontSize={14} fontWeight="600">
                    {item}
                  </S.ItemText>

                  <S.ItemIndicator marginLeft="auto">
                    {isLoading ? (
                      <ActivityIndicator
                        size="small"
                        color={getTokens().color.blue600.val}
                      />
                    ) : (
                      <Check size={16} color={getTokens().color.blue600.val} />
                    )}
                  </S.ItemIndicator>
                </S.Item>
              ))}
            </S.Group>
          </S.Viewport>
        </S.Content>
      </S>
    </YStack>
  )
}

export const Select = forwardRef(SelectComponent)
