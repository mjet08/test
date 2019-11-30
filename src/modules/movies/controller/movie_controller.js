const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

module.exports = () => {
  const router = Router()
  const {
    response: { Success }
  } = container.cradle
  const { userContextMiddleware, movieService } = container.cradle

  router.use(userContextMiddleware)

  router.post('/', async (req, res, next) => {
    try {
      const results = await movieService.createMovie(req.body)
      res.status(Status.OK).json(Success(results))
    } catch (e) {
      next(e)
    }
  })

  router.get('/', async (req, res, next) => {
    try {
      const results = await movieService.getMovieInfo(req.query.page)
      res.status(Status.OK).json(Success(results))
    } catch (e) {
      next(e)
    }
  })

  router.put('/:id', async (req, res, next) => {
    try {
      const results = await movieService.updateMovie(req.body, req.params.id)
      res.status(Status.OK).json(Success(results))
    } catch (e) {
      next(e)
    }
  })

  return router
}
