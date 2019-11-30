import { define } from '../../../containerHelper'

module.exports = define('movieService', ({ CustomError, constants, movieRepository, calculationService, transactionDecorator: { transaction }, directorService, actorService }) => {
  const getMovieInfo = async (pageNo) => {
    let limit = 2
    const totalMovies = await movieRepository.getTotalMovieCount()
    let { offset, nextPage, totalPages } = calculationService.getPaginationInfo(pageNo, limit, totalMovies)
    let movieInfo = await movieRepository.getMoviesInfoPagination(parseInt(offset), parseInt(limit))

    return {
      movieInfo: movieInfo,
      nextPage,
      totalPages
    }
  }

  const createMovie = async (movieInfo) => {
    const movieData = await transaction(createMovieAux)(movieInfo)
    return movieData
  }

  const createMovieAux = async (movieInfo) => {
    const movie = await movieRepository.createMovie(movieInfo)
    await directorService.createMovieDirector(parseInt(movieInfo.director), movie.id)
    let actors = movieInfo.actors.split(',')

    for (let i in actors) {
      await actorService.createMovieActor(parseInt(actors[i]), movie.id)
    }
    return movieRepository.getMovieById(movie.id)
  }

  const updateMovie = async (movieData, movieId) => {
    const movieInfo = await movieRepository.getMovieById(movieId)
    if (!movieInfo) {
      throw new Error('No such movie exists')
    }
    return movieRepository.updateMovie(movieData, movieId)
  }

  return {
    getMovieInfo,
    createMovie,
    updateMovie
  }
})
