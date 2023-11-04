import { AxiosResponse } from 'axios'

type Response<T> = Promise<AxiosResponse<{ data: T }>>

export type Api = {
  get: <T>(url: string) => Response<T>
  post: <T, B>(url: string, body: B) => Response<T>
  put: <T, B>(url: string, body: B) => Response<T>
  delete: <T, B>(url: string, body: B) => Response<T>
}
