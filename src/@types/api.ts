type Meta = {
  pagination: {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
  }
}

export type Api = {
  get: <Response>(url: string) => Promise<Response>
  post: <Request, Response>(
    url: string,
    request: Request
  ) => Promise<{ data: Response }>
  put: <Request>(url: string, request: Request) => Promise<{ data: Response }>
  delete: <Request, Response>(
    url: string,
    request: Request
  ) => Promise<{ data: Response }>
  getBaseUrl(): string
  setBaseUrl(baseUrl: string): void
  setHeader(key: string, value: string): void
  handleError(error: unknown): string
}
