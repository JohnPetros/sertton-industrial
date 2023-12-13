import { Alert } from 'react-native'
import * as Clipboard from 'expo-clipboard'

export function useClipboard(text: string) {
  async function copy() {
    try {
      await Clipboard.setStringAsync(text)
      Alert.alert('Código copiado')
    } catch (error) {
      console.error(text)
    }
  }

  return {
    copy,
  }
}
