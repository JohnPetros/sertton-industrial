import Toast from 'react-native-toast-message'
import * as Clipboard from 'expo-clipboard'

export function useClipboard(text: string, message: string) {
  async function copy() {
    try {
      await Clipboard.setStringAsync(text)
      Toast.show({
        type: 'success',
        text1: message,
      })
    } catch (error) {
      console.error(error)
      Toast.show({
        type: 'error',
        text1: 'Erro ao tentar copiar!',
      })
    }
  }

  return {
    copy,
  }
}
