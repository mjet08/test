import { define } from '../../../containerHelper'

module.exports = define('directorService', ({ CustomError, constants, directorRepository }) => {
  const createDirectorProfile = async (directorData) => {
    return directorRepository.createDirectorProfile(directorData)
  }

  const createMovieDirector = async (directorProfileId, movieId) => {
    const directorInfo = await directorRepository.getDirectorProfileById(directorProfileId)
    return directorRepository.createDirector({ name: directorInfo.name, movieId, directorProfileId })
  }

  const getDirectorProfile = async (id) => {
    return directorRepository.getDirectorProfileById(id)
  }

  return {
    createDirectorProfile,
    createMovieDirector,
    getDirectorProfile
  }
})
