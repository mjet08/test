import logger from './logger'

module.exports = ({ config }) => {
  const _logger = logger({ config })
  let flgSilent = false

  return {
    info: (message) => {
      !flgSilent && _logger.info(message)
    },
    debug: (message) => {
      !flgSilent && _logger.log({ level: 'debug', message })
    },
    warn: (message) => {
      !flgSilent && _logger.log({ level: 'warn', message })
    },
    error: (message) => {
      !flgSilent && _logger.log({ level: 'error', message })
    },
    silent: (flg) => {
      flgSilent = flg
    }
  }
}
