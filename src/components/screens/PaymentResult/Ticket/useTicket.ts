import * as FileSystem from 'expo-file-system'

import { useAppError } from '@/components/shared/AppError/useAppError'

export function useTicket(pdf: string) {
  const { throwAppError } = useAppError()

  async function downloadTicket() {
    if (!FileSystem.documentDirectory) return

    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
    if (!permissions.granted) return

    try {
      const uri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        'boleto_sertton_industrial',
        'application/pdf'
      )

      await FileSystem.writeAsStringAsync(uri, pdf, {
        encoding: FileSystem.EncodingType.Base64,
      })
    } catch (error) {
      throwAppError('Não foi possível baixar o boleto', 500)
    }
  }

  return {
    downloadTicket,
  }
}
