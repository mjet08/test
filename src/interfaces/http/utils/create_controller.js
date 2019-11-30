import { resolve } from 'path'

module.exports = (moduleName, controllerUri) => {
  const controllerPath = resolve('src/modules/' + moduleName + '/controller', controllerUri)
  const Controller = require(controllerPath)
  return Controller()
}
