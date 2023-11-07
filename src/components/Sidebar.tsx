import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowDown } from 'phosphor-react-native'
import { Separator, YStack } from 'tamagui'
import { YGroup } from 'tamagui'
import { ListItem } from 'tamagui'
import { View } from 'tamagui'

import { Button } from '@/components/Button'
import { useCatogories } from '@/hooks/useCategories'

const PADDING_X = 24

export function Sidebar() {
  const { categories } = useCatogories()

  console.log(categories)

  return (
    <SafeAreaView>
      <YStack px={PADDING_X} bg="$gray50">
        <Button
          background="transparent"
          color="$gray900"
          justifyContent="space-between"
        >
          Categories <ArrowDown />
        </Button>
        <YGroup
          separator={
            <View px={PADDING_X}>
              <Separator bg="$gray400" alignSelf="stretch" vertical={false} />
            </View>
          }
        >
          <YGroup.Item>
            <ListItem title="Star" color="$gray800" fontSize={14} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title="Star" color="$gray800" fontSize={14} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title="Star" color="$gray800" fontSize={14} />
          </YGroup.Item>
        </YGroup>
      </YStack>
    </SafeAreaView>
  )
}
