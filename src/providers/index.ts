import { initializeHttpProvider } from '@/services/api/http'
import { AxiosHttpProvider } from '@/services/api/http/axios'
import { initializeDateProvider } from '@/services/date'
import { dayjsDateProvider } from '@/services/date/dayjs'
import { initializeStorageProvider } from '@/services/storage'
import { mmkvStorageProvider } from '@/services/storage/mmkv'
import { initializeValidationProvider } from '@/services/validation'
import { zodValidationProvider } from '@/services/validation/zod/index.ts'

initializeHttpProvider(AxiosHttpProvider)
initializeStorageProvider(mmkvStorageProvider)
initializeDateProvider(dayjsDateProvider)
initializeValidationProvider(zodValidationProvider)
