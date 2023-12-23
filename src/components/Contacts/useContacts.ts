import { Linking } from 'react-native'

import { Contact } from '@/@types/contact'

export function useContacts() {
  function handleContact(contact: Contact) {
    switch (contact.type) {
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?phone=${contact.value}`)
        break
      case 'landline':
        Linking.openURL(`tel:${contact.value}`)
        break
      case 'email':
        Linking.openURL(`mailto:${contact.value}`)
        break
      default:
        return
    }
  }

  return {
    handleContact,
  }
}
