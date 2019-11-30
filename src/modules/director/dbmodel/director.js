module.exports = function (sequelize, DataTypes) {
  const Director = sequelize.define('director', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: true },
    directorProfileId: { type: DataTypes.INTEGER, allowNull: false },
    movieId: { type: DataTypes.INTEGER, allowNull: false }
  }, { freezeTableName: true })

  Director.associate = function (models) {
    Director.belongsTo(models.director_profile, {
      foreignKey: 'director_profile_id',
      sourceKey: 'id'
    })
  }
  return Director
}
