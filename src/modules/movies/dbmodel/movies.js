module.exports = function (sequelize, DataTypes) {
  const Movies = sequelize.define('movies', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: true },
    genre: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATE, allowNull: false },
    avgRating: { type: DataTypes.DOUBLE, defaultValue: 5.0 },
    description: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    rule: { type: DataTypes.STRING, allowNull: true }
  },
  {
    indexes: [
      {
        name: 'movie_unique_name_date',
        unique: true,
        fields: ['name', 'release_date']
      }
    ]
  }, { freezeTableName: true })

  Movies.associate = function (models) {
    Movies.hasMany(models.actor, {
      foreignKey: 'movie_id',
      sourceKey: 'id'
    })
    Movies.hasOne(models.director, {
      foreignKey: 'movie_id',
      sourceKey: 'id'
    })
  }
  return Movies
}
