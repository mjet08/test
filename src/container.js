import { createContainer, asFunction, asValue, Lifetime } from 'awilix'
import { scopePerRequest } from 'awilix-express'

import app from './app'
import server from './interfaces/http/server'
import router from './interfaces/http/router'
import config from '../config'
import logger from './infra/logging'
import database from './infra/database'
import response from './infra/support/response'
import constants from './constants'
import CustomError from './infra/error'
import transactionDecorator from './infra/transaction'

import loggerMiddleware from './interfaces/http/middlewares/http_logger'
import errorHandlerMiddleware from './interfaces/http/middlewares/error_handler'
import authorizeHandlerMiddleware from './interfaces/http/middlewares/authorize_handler'
import validatorMiddleware from './interfaces/http/middlewares/validators'
import userContextMiddleware from './interfaces/http/middlewares/usercontext_handler'

const container = createContainer()

// System
container
  .register({
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config),
    constants: asValue(constants)
  })

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandlerMiddleware: asFunction(errorHandlerMiddleware),
    authorizeMiddleware: asFunction(authorizeHandlerMiddleware).singleton()
  })
  .register({
    validatorMiddleware: asFunction(validatorMiddleware).singleton(),
    userContextMiddleware: asFunction(userContextMiddleware).singleton()
  })

// Database
container.register({
  database: asFunction(database).singleton()
})

// Infra
container.register({
  response: asFunction(response).singleton(),
  CustomError: asFunction(CustomError).singleton(),
  transactionDecorator: asFunction(transactionDecorator).singleton()
})

container.loadModules(['modules/**/repository/*.js'], {
  resolverOptions: {
    register: asFunction,
    lifetime: Lifetime.SINGLETON
  },
  cwd: __dirname
})

container.loadModules(['modules/**/service/*.js'], {
  resolverOptions: {
    register: asFunction,
    lifetime: Lifetime.SINGLETON
  },
  cwd: __dirname
})

module.exports = container
