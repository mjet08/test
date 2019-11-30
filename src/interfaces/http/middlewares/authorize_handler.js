const { intersection } = require('ramda')

module.exports = ({ CustomError, constants: { UNAUTHORIZED_REQUEST } }) => (roles = []) => { // eslint-disable-line no-unused-vars
  // const { logger, config } = req.container.cradle

  if (typeof roles === 'string') {
    roles = [roles]
  }
  return (req, res, next) => {
    if (roles.length > 0 && intersection(roles, req.user.userRoles).length === 0) {
      throw new CustomError(UNAUTHORIZED_REQUEST.code, UNAUTHORIZED_REQUEST.status)
    }
    next()
  }
}
