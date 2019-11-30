const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

module.exports = () => {
  const router = Router()
  const {
    response: { Success }
  } = container.cradle
  const { userContextMiddleware, directorService } = container.cradle

  router.use(userContextMiddleware)

  router.post('/', async (req, res, next) => {
    try {
      const results = await directorService.createDirectorProfile(req.body)
      res.status(Status.OK).json(Success(results))
    } catch (e) {
      next(e)
    }
  })

  return router
}
