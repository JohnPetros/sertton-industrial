import axios from 'axios'

import type { Api } from '@/@types/api'
import { categoriesService } from '@/services/api/categoriesService'
import { collectionsService } from '@/services/api/collectionsService'
import { productsService } from '@/services/api/productsService'
import { skusService } from '@/services/api/skusService'
import { variationsService } from '@/services/api/variationsService'

const BASE_URL = process.env.YAMPI_BASE_URL
const ALIAS = process.env.ALIAS

const axiosClient = axios.create({
  baseURL: `${BASE_URL}/${ALIAS}`,
  headers: {
    'User-Token': process.env.YAMPI_TOKEN,
    'User-Secret-Key': process.env.YAMPI_SECRET_KEY,
  },
})

export function useApi() {
  return {
    ...collectionsService(axiosClient as Api),
    ...productsService(axiosClient as Api),
    ...categoriesService(axiosClient as Api),
    ...variationsService(axiosClient as Api),
    ...skusService(axiosClient as Api),
  }
}
