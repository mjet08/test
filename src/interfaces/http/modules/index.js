import swaggerJSDoc from 'swagger-jsdoc'
import { OK } from 'http-status'
import { Router } from 'express'

module.exports = () => {
  const router = Router()

  // swagger definition
  const swaggerDefinition = {
    info: {
      title: 'Whitehat API Explorer',
      version: '1.0.0',
      description: 'Available REST Endpoints of Whitehat RESTful API'
    },
    host: `${process.env.API_SWAGGER}:${process.env.PORT}/api/${
      process.env.APP_VERSION
    }`,
    basePath: '/',
    securityDefinitions: {
      JWT: {
        description: '',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  }

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['src/interfaces/http/modules/**/*.js']
  }

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options)
  /**
   * @swagger
   * responses:
   *   Unauthorized:
   *     description: Unauthorized
   *   BadRequest:
   *     description: BadRequest / Invalid Input
   */

  /**
   * @swagger
   * /:
   *   get:
   *     tags:
   *       - Status
   *     description: Returns API status
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: API Status
   */
  router.get('/', (req, res) => {
    res.status(OK).json({ status: 'API working' })
  })

  router.get('/swagger.json', (req, res) => {
    res.status(OK).json(swaggerSpec)
  })

  return router
}
