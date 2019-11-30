import movieSchemas from './movies'

module.exports = {
  'post': {
    '/movies': movieSchemas.createMovie
    // '/token/': userSchemas.login
  }
  // 'put': {
  //   '/users/': userSchemas.update
  // }
}
