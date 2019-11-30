const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

module.exports = () => {
  const router = Router()
  const {
    response: { Success }
  } = container.cradle
  const { auth, config, userContextMiddleware } = container.cradle

  /**
   * @swagger
   * definitions:
   *   user:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       middleName:
   *         type: string
   *       email:
   *         type: string
   *       roleId:
   *         type: number
   *       isDeleted:
   *         type: number
   *       createdBy:
   *         type: string
   *         format: uuid
   */

  router.use(auth.authenticate())
  router.use(userContextMiddleware)
  /**
   * @swagger
   * /user:
   *   get:
   *     tags:
   *       - User
   *     description: Returns loggedin user Details
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: Logged In User
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/user'
   *       401:
   *        $ref: '#/responses/Unauthorized'
   */
  router.get('/', (req, res, next) => {
    try {
      res.status(Status.OK).json(
        Success({
          user: req.user,
          config: config.appConfig
        })
      )
    } catch (e) {
      // let middle ware handle the errors
      next(e)
    }
  })

  return router
}
