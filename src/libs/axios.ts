import axios, { isAxiosError } from 'axios'

import type { Api } from '@/@types/api'

const BASE_URL = process.env.YAMPI_BASE_URL
const ALIAS = process.env.ALIAS
const TOKEN = process.env.YAMPI_TOKEN
const SECRET_KEY = process.env.YAMPI_SECRET_KEY

const axiosClient = axios.create()

export const axiosApi: Api = {
  async get<Response>(url: string) {
    const { data } = await axiosClient.get(url)
    return data as Response
  },
  async post<Request, Response>(url: string, request: Request) {
    const response = await axiosClient.post(url, request)
    return response.data as Response
  },
  async put<Request, Response>(url: string, request: Request) {
    return (await axiosClient.put(url, request)) as Response
  },
  async delete<Response>(url: string) {
    return (await axiosClient.delete(url)) as Response
  },

  getBaseUrl() {
    return axiosClient.defaults.baseURL ?? ''
  },

  setBaseUrl(baseUrl) {
    axiosClient.defaults.baseURL = baseUrl
  },

  setHeader(key: string, value: string) {
    axiosClient.defaults.headers[key] = value
  },

  setDefaultConfig() {
    if (!BASE_URL || !ALIAS || !TOKEN || !SECRET_KEY) {
      throw new Error('invalid API env vars')
    }

    this.setBaseUrl(`${BASE_URL}/${ALIAS}`)
    this.setHeader('User-Token', TOKEN)
    this.setHeader('User-Secret-Key', SECRET_KEY)
  },

  handleError(error: unknown) {
    if (isAxiosError(error)) {
      console.error(error.response)

      return error.message
    }

    console.error({ error })

    return 'Unknown Api Error'
  },
}
