import { AxiosResponse } from 'axios'

type Response<T> = Promise<AxiosResponse<{ data: T }>>

export type Api = {
  get: <T>(url: string) => Response<T>
  post: <T, Request>(url: string, request: Request) => Response<T>
  put: <T, Request>(url: string, request: Request) => Response<T>
  delete: <T, Request>(url: string, request: Request) => Response<T>
}
