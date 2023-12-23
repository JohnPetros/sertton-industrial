import { ReactNode } from 'react'
import { EnvelopeSimple, Phone, WhatsappLogo } from 'phosphor-react-native'
import { getTokens, Text } from 'tamagui'
import { XStack } from 'tamagui'

import { ContactType } from '@/@types/contact'
import { Button } from '@/components/Button'
import { useContacts } from '@/components/Contacts/useContacts'
import { CONTACTS } from '@/utils/constants/contacts'

export function Contacts() {
  const { handleContact } = useContacts()

  const CONTACT_ICONS: Record<ContactType, ReactNode> = {
    whatsapp: <WhatsappLogo color={getTokens().color.green600.val} />,
    landline: <Phone color={getTokens().color.gray600.val} />,
    email: <EnvelopeSimple color={getTokens().color.gray600.val} />,
  }

  return CONTACTS.map((contact) => (
    <Button
      key={contact.value}
      background="transparent"
      justifyContent="flex-start"
      px={0}
      onPress={() => handleContact(contact)}
    >
      <XStack gap={4}>
        {CONTACT_ICONS[contact.type]}
        <Text
          color={contact.type === 'whatsapp' ? '$green600' : '$gray600'}
          fontWeight="600"
          fontSize={14}
        >
          {contact.value}
        </Text>
      </XStack>
    </Button>
  ))
}
