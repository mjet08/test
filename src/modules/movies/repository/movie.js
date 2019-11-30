import { define } from '../../../containerHelper'

module.exports = define('movieRepository', ({ database, constants }) => {
  const movieModel = database['movies']

  const createMovie = async (movieInfo) => {
    return movieModel.create(movieInfo)
  }

  const updateMovie = async (movieInfo, id) => {
    return movieModel.update(movieInfo, { where: { id } }).then(() => {
      return getMovieById(id)
    })
  }

  const getMovieById = (id) => {
    return movieModel.findOne({
      where: { id },
      include: [{
        model: database.actor,
        attributes: ['id', 'name']
      },
      {
        model: database.director,
        attributes: ['id', 'name']
      }
      ]
    })
  }

  const getTotalMovieCount = () => {
    return movieModel.count()
  }

  const getMoviesInfoPagination = (offset, limit) => {
    return movieModel.findAll({
      include: [{
        model: database.actor,
        attributes: ['id', 'name']
      },
      {
        model: database.director,
        attributes: ['id', 'name']
      }
      ],
      limit: limit,
      offset: offset,
      order: [
        ['created_at', 'DESC']
      ]
    })
  }

  return {
    createMovie,
    updateMovie,
    getMovieById,
    getTotalMovieCount,
    getMoviesInfoPagination

  }
})
