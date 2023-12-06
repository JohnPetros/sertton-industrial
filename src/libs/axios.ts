import axios, { isAxiosError } from 'axios'

import type { Api } from '@/@types/api'

const axiosClient = axios.create()

export const axiosApi: Api = {
  async get<Response>(url: string) {
    const { data } = await axiosClient.get(url)
    return data as Response
  },
  async post<Request, Response>(url: string, request: Request) {
    return (await axiosClient.post(url, request)) as Response
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

  handleError(error: unknown) {
    if (isAxiosError(error)) {
      console.error('REQUEST =>', error.request)
      console.error(error.message)

      return error.message
    }

    console.error(error)

    return 'Unknown Api Error'
  },
}
