import { INTERNAL_SERVER_ERROR } from 'http-status'

/* istanbul ignore next */
module.exports = ({
  logger,
  config,
  CustomError,
  response: { Fail }
}) => async (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  // const { logger, config } = req.container.cradle
  if (err) {
    logger.error(err)
    if (err instanceof CustomError) {
      /*
        In case the error has already been handled, we just transform the error
        to our return object.
      */
      return res.status(err.status).send(
        Fail(
          Object.assign(
            {
              type: err.code,
              description: err.message,
              data: err.data
            },
            config.env === 'development' && {
              message: err.message,
              stack: err.stack
            }
          )
        )
      )
    } else {
      const response = Object.assign(
        {
          type: 'InternalServerError'
        },
        config.env === 'development' && {
          message: err.message,
          stack: err.stack
        }
      )

      res.status(INTERNAL_SERVER_ERROR).json(Fail(response))
    }
  }
}
