const { DataTypes } = require("sequelize");
const db = require("../configs/Database");

const ModelUser = db.define(
  "tb_user",
  {
    id_user: {
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    nip: {
      type: DataTypes.CHAR(30),
      unique: true,
    },
    nik: {
      type: DataTypes.CHAR(20),
      unique: true,
    },
    nama: {
      type: DataTypes.STRING,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM("L", "P"),
    },
    tempat_lahir: {
      type: DataTypes.STRING,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
    },
    telpon: {
      type: DataTypes.CHAR(20),
    },
    agama: {
      type: DataTypes.STRING,
    },
    status_nikah: {
      type: DataTypes.ENUM("Nikah", "Belum Nikah"),
    },
    alamat: {
      type: DataTypes.TEXT,
    },
    jabatan: {
      type: DataTypes.STRING,
    },
    foto: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = ModelUser;
