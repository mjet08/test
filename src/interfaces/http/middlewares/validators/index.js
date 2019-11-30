import { includes, has, get, map } from 'lodash'
import joi from 'joi'
import Schemas from './schemas'

module.exports = ({ response: { Success, Fail }, CustomError, constants: { INVALID_REQUEST, DEVELOPMENT }, logger, config }) => (useJoiError = false) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  // const _useJoiError = isBoolean(useJoiError) && useJoiError

  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'put']

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true // remove unknown keys from the validated data
  }

  // return the validation middleware
  return (req, res, next) => {
    const route = req.path
    const method = req.method.toLowerCase()
    console.log(route, method, has(Schemas, method + '.' + route))
    if (includes(_supportedMethods, method) && has(Schemas, method + '.' + route)) {
      // get schema for the current route
      const _schema = get(Schemas, method + '.' + route)

      if (_schema) {
        // Validate req.body using the schema and validation options
        return joi.validate(req.body, _schema, _validationOptions, (err, data) => {
          if (err) {
            // Joi Error
            const JoiError = {
              status: 'failed',
              error: {
                original: err._object,

                // fetch only message and type from each error
                details: map(err.details, ({ message, type }) => ({
                  message: message.replace(/['"]/g, ''),
                  type
                }))
              }
            }
            if (config.env === DEVELOPMENT) {
              logger.info(JoiError)
            }
            // Custom Error
            throw new CustomError(INVALID_REQUEST.code, INVALID_REQUEST.status, 'Invalid request data. Please review request and try again.')

            // Send back the JSON error response
            // res.status(Status.BAD_REQUEST).json(Fail(_useJoiError ? JoiError : CustomError))
          } else {
            // Replace req.body with the data after Joi validation
            req.body = data
            next()
          }
        })
      }
    }
    next()
  }
}
