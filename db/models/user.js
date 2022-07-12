const users = (db, DataTypes, options) => {
  const { paranoid, ...other } = options;
  const model = db.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, unique: true },
      photo: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING, unique: true },
      role: { type: DataTypes.STRING, defaultValue: "USER" },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
    },
    { ...other, paranoid: false, timestamps: false }
  );
  model.associate = function (models) {

    model.hasOne(models.user_details, {
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });

    model.belongsToMany(model, {as: 'Subscribe', foreignKey: "idolId", through: "subscriptions"});
    model.belongsToMany(model, {as: 'BackSubscribe', foreignKey: "subscriberId", through: "subscriptions"});
  };

  return model;
};

module.exports = users;
