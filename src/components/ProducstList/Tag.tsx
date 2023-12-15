import { X } from 'phosphor-react-native'
import { getTokens } from 'tamagui'

import { FilterType } from '@/@types/tag'
import { Button } from '@/components/Button'

interface TagProps {
  id: string
  type: FilterType
  title: string
  onPress: (type: FilterType, id: string) => void
}

export function Tag({ title, id, type, onPress }: TagProps) {
  return (
    <Button
      h={28}
      fontSize={12}
      background="secondary"
      onPress={() => onPress(type, id)}
    >
      {title}
      <X color={getTokens().color.white.val} size={16} />
    </Button>
  )
}
