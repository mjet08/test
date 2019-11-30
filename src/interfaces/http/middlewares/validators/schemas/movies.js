import Joi from 'joi'

module.exports = {
  createMovie: Joi.object().keys({
    name: Joi.string().required(),
    genre: Joi.string().required(),
    releaseDate: Joi.date().iso().required(),
    director: Joi.string().required(),
    actors: Joi.string().required(),
    avgRating: Joi.number().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    rule: Joi.string().optional()
  }),
  updateMovie: Joi.object().keys({
    name: Joi.string().optional().not(''),
    genre: Joi.string().optional().not(''),
    releaseDate: Joi.date().iso().optional(),
    director: Joi.string().optional().not(''),
    actors: Joi.string().optional().not(''),
    avgRating: Joi.number().optional().not(''),
    description: Joi.string().optional().not(''),
    country: Joi.string().optional().not(''),
    rule: Joi.string().optional().not('')
  })
}
