import { ReactNode } from 'react'
import { Dimensions, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CaretDown, Phone, WhatsappLogo } from 'phosphor-react-native'
import { getTokens, Separator, Text, XStack, YStack } from 'tamagui'
import { YGroup } from 'tamagui'
import { ListItem } from 'tamagui'
import { View } from 'tamagui'

import { Contact, ContactType } from '@/@types/contact'
import { Button } from '@/components/Button'
import { useCatogories } from '@/hooks/useCategories'
import { CONTACTS } from '@/utils/constants/contacts'

const SCREEN_HEIGHT = Dimensions.get('screen').height

const PADDING_X = 24

const CONTACT_ICONS: Record<ContactType, ReactNode> = {
  whatsapp: <WhatsappLogo color={getTokens().color.green600.val} />,
  landline: <Phone color={getTokens().color.gray600.val} />,
}

export function Sidebar() {
  const { categories } = useCatogories()

  function handleContact(contact: Contact) {
    switch (contact.type) {
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?phone=${contact.value}`)
        break
      case 'landline':
        Linking.openURL(`tel:${contact.value}`)
        break
      default:
        return
    }
  }

  return (
    <SafeAreaView>
      <YStack my={-48} h={SCREEN_HEIGHT} px={PADDING_X} bg="$gray50">
        <Button
          background="transparent"
          color="$gray900"
          justifyContent="space-between"
        >
          Categorias <CaretDown />
        </Button>
        <YGroup
          separator={
            <View px={PADDING_X}>
              <Separator bg="$gray400" alignSelf="stretch" vertical={false} />
            </View>
          }
          borderRadius={4}
        >
          {categories?.map((category) => (
            <YGroup.Item key={category.id.toString()}>
              <ListItem title={category.name} color="$gray800" fontSize={14} />
            </YGroup.Item>
          ))}
        </YGroup>
        <YStack mt={12}>
          {CONTACTS.map((contact) => (
            <Button
              key={contact.value}
              background="transparent"
              justifyContent="flex-start"
              px={0}
              onPress={() => handleContact(contact)}
            >
              <XStack gap={4}>
                {CONTACT_ICONS[contact.type]}
                <Text color="$green600" fontWeight="600" fontSize={14}>
                  {contact.value}
                </Text>
              </XStack>
            </Button>
          ))}
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
