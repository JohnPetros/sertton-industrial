import { initializeHttpProvider } from '@/services/api/http'
import { AxiosProvider } from '@/services/api/http/axios'
import { initializeDateProvider } from '@/services/date'
import { dayjsProvider } from '@/services/date/dayjs'
import { initializeStorageProvider } from '@/services/storage'
import { mmkvProvider } from '@/services/storage/mmkv'
import { initializeValidationProvider } from '@/services/validation'
import { zodProvider } from '@/services/validation/zod/index.ts'

initializeHttpProvider(AxiosProvider)
initializeStorageProvider(mmkvProvider)
initializeDateProvider(dayjsProvider)
initializeValidationProvider(zodProvider)
