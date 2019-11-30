'use strict'

module.exports = function (sequelize, DataTypes) {
  const Actor = sequelize.define('actor', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: true },
    actorProfileId: { type: DataTypes.INTEGER, allowNull: false },
    movieId: { type: DataTypes.INTEGER, allowNull: false }
  }, { freezeTableName: true })
  Actor.associate = function (models) {
    Actor.belongsTo(models.actor_profile, {
      foreignKey: 'actor_profile_id',
      sourceKey: 'id'
    })
  }
  return Actor
}
