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

module.exports = { getAbsensiByUser };
