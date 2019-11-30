import { define } from '../../../containerHelper'

module.exports = define('actorService', ({ CustomError, constants, actorRepository }) => {
  const createActorProfile = async (actorData) => {
    return actorRepository.createActorProfile(actorData)
  }

  const createMovieActor = async (actorProfileId, movieId) => {
    const actorProfile = await actorRepository.getActorByProfileId(actorProfileId)
    await actorRepository.createMovieActor({ name: actorProfile.name, movieId, actorProfileId })
  }

  return {
    createActorProfile,
    createMovieActor
  }
})
