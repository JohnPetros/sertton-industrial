export const envVarsConfig = {
  API_BASE_URL: 'msw',
  ALIAS: 'alias',
  YAMPI_TOKEN: 'token',
  YAMPI_SECRET_KEY: 'secret_token',
}

process.env.YAMPI_BASE_URL = envVarsConfig.API_BASE_URL
process.env.ALIAS = envVarsConfig.ALIAS
process.env.YAMPI_TOKEN = envVarsConfig.YAMPI_TOKEN
process.env.YAMPI_SECRET_KEY = envVarsConfig.YAMPI_SECRET_KEY
process.env.VIA_CEP_BASE_URL = envVarsConfig.API_BASE_URL
