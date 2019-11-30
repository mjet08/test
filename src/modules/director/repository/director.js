import { define } from '../../../containerHelper'

module.exports = define('directorRepository', ({ database, constants }) => {
  const directorProfileModel = database['director_profile']
  const directorModel = database['director']

  const createDirectorProfile = async (directorInfo) => {
    return directorProfileModel.create(directorInfo)
  }

  const createDirector = async (directorInfo) => {
    return directorModel.create(directorInfo)
  }

  const getDirectorProfileById = async (id) => {
    return directorProfileModel.findOne({ where: { id } })
  }

  return {
    createDirectorProfile,
    createDirector,
    getDirectorProfileById
  }
})
