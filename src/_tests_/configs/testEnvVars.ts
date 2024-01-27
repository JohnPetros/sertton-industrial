export const testEnvVars = {
  API_BASE_URL: 'msw',
  ALIAS: 'alias',
  YAMPI_TOKEN: 'token',
  YAMPI_SECRET_KEY: 'secret_token',
  PAGARME_PUBLIC_KEY: 'pagarme.secret_key',
}

process.env.YAMPI_BASE_URL = testEnvVars.API_BASE_URL
process.env.ALIAS = testEnvVars.ALIAS
process.env.YAMPI_TOKEN = testEnvVars.YAMPI_TOKEN
process.env.YAMPI_SECRET_KEY = testEnvVars.YAMPI_SECRET_KEY
process.env.VIA_CEP_BASE_URL = testEnvVars.API_BASE_URL
