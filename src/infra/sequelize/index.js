'use strict'

import { basename as _basename, join } from 'path'
import Sequelize from 'sequelize'
import cls from 'continuation-local-storage'
const decamelize = require('decamelize');

const fs = require('fs')

const namespace = cls.createNamespace('transaction-namespace')
Sequelize.useCLS(namespace)
const basename = _basename(__filename)
module.exports = ({ config, basePath }) => {
  let sequelize
  const db = {}
  db.models = {}

  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    )
  }

  sequelize.addHook('beforeDefine', (attributes) => {
    Object.keys(attributes).forEach((key) => {
      if (typeof attributes[key] !== 'function') {
        attributes[key].field = decamelize(key)
      }
    })
  })

  const moduleNames = ['actor', 'director', 'movies']
  const dirs = []

  moduleNames.forEach(m => {
    dirs.push(join(__dirname, '/../../modules/', m, '/dbmodel'))
  })

  for (const i in dirs) {
    const dir = dirs[i]
    fs
      .readdirSync(dir)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
      })
      .forEach(file => {
        const model = sequelize['import'](join(dir, file))
        db[model.name] = model
      })

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    })
  }

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  return db
}
