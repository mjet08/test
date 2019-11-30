import { errorCodes } from './errorCodes'

const environments = {
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production'
}

module.exports = {
  ...errorCodes,
  ...environments
}
