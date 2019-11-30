import httpContext from 'express-cls-hooked'

module.exports = () => {
  // return the validation middleware
  return (req, res, next) => {
    // register some request-specific data..
    httpContext.set('currentuser', req.user)
    next()
  }
}
