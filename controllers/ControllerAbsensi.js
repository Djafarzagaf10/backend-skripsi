const { Op } = require("sequelize");
const ModelAbsensi = require("../models/ModelAbsensi");
const moment = require("moment");
const ModelUser = require("../models/ModelUser");

const getAbsensiByUser = async (req, res) => {
  try {
    const currentMonthStart = moment().startOf("month").toDate();
    const currentMonthEnd = moment().endOf("month").toDate();

    const response = await ModelAbsensi.findAll({
      include: {
        model: ModelUser,
        as: "user",
        foreignKey: "user_id",
      },
      where: {
        tanggal_absensi: {
          [Op.between]: [currentMonthStart, currentMonthEnd],
        },
        user_id: req.params.id,
        status_absensi: 2
      },
      order: [["tanggal_absensi", "DESC"]],
    });

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

const pengajuanAbsensi = async(req, res) => {
  try {
    const {status, userId} = req.body
    const date = new Date()
    await ModelAbsensi.create({
      user_id: userId,
      tanggal_absensi: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      jam_absensi: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
      status_absensi: 2,
      status_kehadiran: status,
    });

    return res.status(201).json({message: "Berhasil di ajukan!"})
  } catch (error) {
    return res.status(500).json({error})
  }
}

module.exports = { getAbsensiByUser, pengajuanAbsensi };
