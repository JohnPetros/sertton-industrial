import axios from 'axios'

import { Api } from '@/@types/api'
import { collectionsService } from '@/services/api/collectionsService'
import { productsService } from '@/services/api/productsServices'

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
  }
}
