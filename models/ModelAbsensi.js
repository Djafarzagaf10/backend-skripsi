const { DataTypes } = require("sequelize");
const db = require("../configs/Database");
const ModelUser = require("./ModelUser");

const ModelAbsensi = db.define(
  "tb_absensi",
  {
    id_absensi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    tanggal_absensi: {
      type: DataTypes.DATEONLY,
    },
    jam_absensi: {
      type: DataTypes.TIME,
    },
    status_absensi: {
      type: DataTypes.INTEGER,
    },
    status_kehadiran: {
      type: DataTypes.ENUM("Hadir", "Izin", "Sakit", "Alpa"),
    },
  },
  {
    freezeTableName: true,
  }
);

ModelAbsensi.belongsTo(ModelUser, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "cascade",
});
ModelUser.hasMany(ModelAbsensi, { foreignKey: "user_id", as: "absensi" });

module.exports = ModelAbsensi;
