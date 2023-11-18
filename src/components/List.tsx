import { Circle } from 'phosphor-react-native'
import { getTokens, ListItem, YGroup } from 'tamagui'

interface ListProps {
  items: string[]
}

export function List({ items }: ListProps) {
  return (
    <YGroup>
      {items.map((item) => (
        <YGroup.Item key={item}>
          <ListItem
            my={-8}
            px={0}
            bg="$gray50"
            fontSize={12}
            textAlign="left"
            icon={
              <Circle
                size={8}
                color={getTokens().color.green800.val}
                weight="fill"
              />
            }
            title={item}
          />
        </YGroup.Item>
      ))}
    </YGroup>
  )
}
