import { initializeApiProvider } from '@/services/api'
import { axiosProvider } from '@/services/api/axios'
import { initializeDateProvider } from '@/services/date'
import { dayjsProvider } from '@/services/date/dayjs'
import { initializeStorageProvider } from '@/services/storage'
import { mmkvProvider } from '@/services/storage/mmkv'
import { initializeValidation } from '@/services/validation'
import { zodProvider } from '@/services/validation/zod/index.ts'

initializeStorageProvider(mmkvProvider)
initializeDateProvider(dayjsProvider)
initializeApiProvider(axiosProvider)
initializeValidation(zodProvider)
