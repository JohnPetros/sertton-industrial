import axios, { AxiosInstance, isAxiosError } from 'axios'

import { IHttpProvider } from '../interfaces/IHttp'

import { testEnvVars } from '@/_tests_/configs/testEnvVars'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

const BASE_URL = !IS_TEST_ENV
  ? process.env.YAMPI_BASE_URL
  : `http://localhost/${testEnvVars.API_BASE_URL}/${testEnvVars.ALIAS}`

const ALIAS = !IS_TEST_ENV ? process.env.ALIAS : testEnvVars.ALIAS

const TOKEN = !IS_TEST_ENV ? process.env.YAMPI_TOKEN : testEnvVars.YAMPI_TOKEN

const SECRET_KEY = !IS_TEST_ENV
  ? process.env.YAMPI_SECRET_KEY
  : testEnvVars.YAMPI_SECRET_KEY

export const AxiosProvider = (): IHttpProvider => {
  let axiosClient: AxiosInstance

  return {
    init() {
      axiosClient = axios.create()
    },

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
      if (!axiosClient) return ''

      return axiosClient.defaults.baseURL ?? ''
    },

    setBaseUrl(baseUrl: string) {
      if (axiosClient) axiosClient.defaults.baseURL = baseUrl
    },

    setHeader(key: string, value: string) {
      if (axiosClient) axiosClient.defaults.headers[key] = value
    },

    setParams(key: string, value: string) {
      if (axiosClient)
        axiosClient.defaults.params = {
          [key]: value,
        }
    },

    setDefaultConfig() {
      if (!BASE_URL || !ALIAS || !TOKEN || !SECRET_KEY) {
        throw new Error('invalid API env vars')
      }

      // this.setBaseUrl(`${BASE_URL}/${ALIAS}`)
      // this.setHeader('User-Token', TOKEN)
      // this.setHeader('User-Secret-Key', SECRET_KEY)
    },

    handleError<Error>(error: unknown) {
      if (isAxiosError(error)) {
        console.error(JSON.stringify(error.response, null, 2))

        return error.response?.data as Error
      }

      return error as Error
    },
  }
}
