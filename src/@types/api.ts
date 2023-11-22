import { AxiosResponse } from 'axios'

type Meta = {
  pagination: {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
  }
}

type Response<T> = Promise<AxiosResponse<{ data: T; meta: Meta }>>

export type Api = {
  get: <T>(url: string) => Response<T>
  post: <T, Request>(url: string, request: Request) => Response<T>
  put: <T, Request>(url: string, request: Request) => Response<T>
  delete: <T, Request>(url: string, request: Request) => Response<T>
}
