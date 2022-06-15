const user_details = (db, DataTypes, options) => {
  const { paranoid, ...other } = options;
  const model = db.define(
    "user_details",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bio: { type: DataTypes.STRING },
      verification: { type: DataTypes.STRING, defaultValue: false },
    },
    { ...other, paranoid: false, timestamps: true }
  );
  model.associate = function (models) {
    model.belongsTo(models.users);
  };
  return model;
};

module.exports = user_details;
