import { Circle } from 'phosphor-react-native'
import { getTokens, ListItem, Text, YGroup } from 'tamagui'

interface ListProps {
  items: string[]
}

export function List({ items }: ListProps) {
  return (
    <YGroup>
      {items.map((item) => (
        <YGroup.Item key={item}>
          <ListItem
            my={-4}
            px={0}
            fontSize={12}
            alignItems="center"
            justifyContent="flex-start"
            icon={
              <Circle
                size={8}
                color={getTokens().color.green800.val}
                weight="fill"
              />
            }
          >
            <Text textAlign="left">{item}</Text>
          </ListItem>
        </YGroup.Item>
      ))}
    </YGroup>
  )
}
