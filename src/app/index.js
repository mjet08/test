
/**
 * We want to start here so we can manage other infrastructure
 * database
 * memcache
 * express server
 */
module.exports = ({ server, database, logger }) => {
  return {
    start: () =>
      Promise
        .resolve()
        .then(result => database.sequelize.authenticate())
        .then(result => database.sequelize.sync())
        .then(server.start),
    logger: logger
  }
}
