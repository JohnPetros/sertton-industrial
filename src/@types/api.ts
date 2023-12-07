export type Api = {
  get: <Response>(url: string) => Promise<Response>
  post: <Request, Response>(url: string, request: Request) => Promise<Response>
  put: <Request>(url: string, request: Request) => Promise<Response>
  delete: <Response>(url: string) => Promise<Response>
  getBaseUrl(): string
  setBaseUrl(baseUrl: string): void
  setHeader(key: string, value: string): void
  handleError(error: unknown): string
}
