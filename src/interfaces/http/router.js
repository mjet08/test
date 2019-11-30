import statusMonitor from 'express-status-monitor'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'

import { Router } from 'express'

import controller from './utils/create_controller'
import httpContext from 'express-cls-hooked'

module.exports = ({
  config,
  containerMiddleware,
  logger,
  database,
  loggerMiddleware,
  errorHandlerMiddleware,
  validatorMiddleware
}) => {
  const router = Router()

  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  if (config.env !== 'test') {
    router.use(loggerMiddleware)
  }
  const apiRouter = Router()

  apiRouter
    .use(
      cors({
        origin: [config.clientEndPoint],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    )
    .use(
      urlencoded({
        extended: true
      })
    )
    .use(json())
    .use(compression())
    .use(httpContext.middleware)
    .use(containerMiddleware)

  apiRouter.use(validatorMiddleware())

  apiRouter.use('/movies', controller('movies', 'movie_controller'))
  apiRouter.use('/actor', controller('actor', 'actor_controller'))
  apiRouter.use('/director', controller('director', 'director_controller'))

  router.use(`/api/${config.version}`, apiRouter)

  router.use(errorHandlerMiddleware)

  return router
}
