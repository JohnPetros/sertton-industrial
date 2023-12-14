import { Alert } from 'react-native'
import * as Clipboard from 'expo-clipboard'

export function useClipboard(text: string, message: string) {
  async function copy() {
    try {
      await Clipboard.setStringAsync(text)
      Alert.alert(message)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    copy,
  }
}
