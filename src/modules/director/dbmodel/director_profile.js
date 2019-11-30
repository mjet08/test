module.exports = function (sequelize, DataTypes) {
  const DirectorProfile = sequelize.define('director_profile', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: true }
  }, { freezeTableName: true })
  return DirectorProfile
}
