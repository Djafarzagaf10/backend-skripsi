const { DataTypes } = require("sequelize");
const db = require("../configs/Database");

const ModelSetting = db.define(
  "tb_setting",
  {
    id_setting: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    jam_absen_datang: {
      type: DataTypes.TIME,
    },
    jam_akhir_absen_datang: {
      type: DataTypes.TIME,
    },
    jam_absen_pulang: {
      type: DataTypes.TIME,
    },
    jam_akhir_absen_pulang: {
      type: DataTypes.TIME,
    },
  },
  { freezeTableName: true }
);

module.exports = ModelSetting;
