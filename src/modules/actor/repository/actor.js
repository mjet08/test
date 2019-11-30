import { define } from '../../../containerHelper'

module.exports = define('actorRepository', ({ database, constants }) => {
  const actorProfileModel = database['actor_profile']
  const actorModel = database['actor']

  const createActorProfile = async (actorInfo) => {
    return actorProfileModel.create(actorInfo)
  }

  const createMovieActor = async (actorInfo) => {
    return actorModel.create(actorInfo)
  }

  const getActorByProfileId = async (id) => {
    return actorProfileModel.findOne({ where: { id } })
  }

  return {
    createActorProfile,
    createMovieActor,
    getActorByProfileId
  }
})
