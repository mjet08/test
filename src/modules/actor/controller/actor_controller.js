const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

module.exports = () => {
  const router = Router()
  const {
    response: { Success }
  } = container.cradle
  const { userContextMiddleware, actorService } = container.cradle

  router.use(userContextMiddleware)

  router.post('/', async (req, res, next) => {
    try {
      const results = await actorService.createActorProfile(req.body)
      res.status(Status.OK).json(Success(results))
    } catch (e) {
      next(e)
    }
  })

  return router
}
