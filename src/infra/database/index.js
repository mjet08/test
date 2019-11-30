'use strict'
import sequelize from 'src/infra/sequelize'

module.exports = ({ logger, config }) => {
  if (!config.db) {
    /* eslint-disable no-console */
    logger.error('Database config file log not found, disabling database.')
    /* eslint-enable no-console */
    return false
  }

  return sequelize({ config: config.db, basePath: __dirname })
}
