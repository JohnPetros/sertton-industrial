export type Api = {
  get: <Response>(url: string) => Promise<Response>
  post: <Response>(url: string, request: unknown) => Promise<Response>
  put: <Response>(url: string, request: unknown) => Promise<Response>
  delete: <Response>(url: string) => Promise<Response>
  getBaseUrl(): string
  setBaseUrl(baseUrl: string): void
  setHeader(key: string, value: string): void
  handleError(error: unknown): string
}
