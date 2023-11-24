import axios from 'axios'

import type { Api } from '@/@types/api'
import { brandsService } from '@/services/api/brandsService'
import { categoriesService } from '@/services/api/categoriesService'
import { collectionsService } from '@/services/api/collectionsService'
import { commentsService } from '@/services/api/commentsService'
import { logisticsService } from '@/services/api/logisticsService'
import { productsService } from '@/services/api/productsService'
import { reviewsService } from '@/services/api/reviewsService'
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

const api = axiosClient as Api

export function useApi() {
  return {
    ...brandsService(api),
    ...categoriesService(api),
    ...collectionsService(api),
    ...logisticsService(api),
    ...productsService(api),
    ...variationsService(api),
    ...skusService(api),
    ...commentsService(api),
    ...reviewsService(api),
  }
}
