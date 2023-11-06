import { useState } from 'react'
import { CaretDown, Check, X } from 'phosphor-react-native'
import {
  Adapt,
  getTokens,
  Select as S,
  Separator,
  Sheet,
  View,
  XStack,
} from 'tamagui'
import { Text } from 'tamagui'

import { Button } from '@/components/Button'

interface SelectProps {
  items: string[]
  defaultValue: string
  width: number
}

export function Select({ items, defaultValue, width }: SelectProps) {
  const [seletedValue, setSelectedValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function handleChangeValue(value: string) {
    setSelectedValue(value)
  }

  function handleOpenChage(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  return (
    <S
      defaultValue={defaultValue}
      onValueChange={handleChangeValue}
      open={isOpen}
      value={seletedValue}
    >
      <S.Trigger
        borderWidth={1}
        borderColor="$gray400"
        borderRadius={4}
        fontSize={14}
        bg="$gray50"
        w={width}
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
                <Separator bg="$gray400" alignSelf="stretch" vertical={false} />
              </View>
            }
          >
            {items.map((item, index) => (
              <S.Item key={item} index={index} value={item}>
                <S.ItemText fontSize={14} fontWeight="600">
                  {item}
                </S.ItemText>
                <S.ItemIndicator marginLeft="auto">
                  <Check size={16} color={getTokens().color.blue600.val} />
                </S.ItemIndicator>
              </S.Item>
            ))}
          </S.Group>
        </S.Viewport>
      </S.Content>
    </S>
  )
}
