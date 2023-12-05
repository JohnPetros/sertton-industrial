import axios, { isAxiosError } from 'axios'

import type { Api } from '@/@types/api'

const BASE_URL = process.env.YAMPI_BASE_URL
const ALIAS = process.env.ALIAS

const axiosClient = axios.create({
  baseURL: `${BASE_URL}/${ALIAS}`,
  headers: {
    'User-Token': process.env.YAMPI_TOKEN,
    'User-Secret-Key': process.env.YAMPI_SECRET_KEY,
  },
})

export const axiosApi: Api = {
  async get(url) {
    const { data } = await axiosClient.get(url)
    return data
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
  handleError(error: unknown) {
    if (isAxiosError(error)) {
      console.error('RESPONSE =>', error.response)

      return error.message
    }

    return 'Unknown Api Error'
  },
}
