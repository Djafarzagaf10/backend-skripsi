const { DataTypes } = require("sequelize");
const db = require("../configs/Database");
const ModelUser = require("./ModelUser");

const ModelFace = db.define(
  "tb_face",
  {
    id_face: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    user_id: {
      type: DataTypes.STRING,
    },
    foto: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

ModelFace.belongsTo(ModelUser, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "cascade",
});
ModelUser.hasMany(ModelFace, { foreignKey: "user_id", as: "face" });

module.exports = ModelFace;
