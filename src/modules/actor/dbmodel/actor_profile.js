'use strict'

module.exports = function (sequelize, DataTypes) {
  const ActorProfile = sequelize.define('actor_profile', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: true }
  }, { freezeTableName: true })
  return ActorProfile
}
