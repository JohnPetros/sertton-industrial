import { Circle } from 'phosphor-react-native'
import { getTokens, ListItem, Text, YGroup } from 'tamagui'

interface ListProps {
  items: string[]
  bgColor?: '$gray50' | '$white'
}

export function List({ items, bgColor = '$gray50' }: ListProps) {
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
            bg={bgColor}
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
