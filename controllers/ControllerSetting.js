const ModelSetting = require("../models/ModelSetting");

const createSetting = async (req, res) => {
  try {
    const {
      jamAbsenDatang,
      jamAkhirAbsenDatang,
      jamAbsenPulang,
      jamAkhirAbsenPulang,
    } = req.body;
    await ModelSetting.create({
      jam_absen_datang: jamAbsenDatang,
      jam_akhir_absen_datang: jamAkhirAbsenDatang,
      jam_absen_pulang: jamAbsenPulang,
      jam_akhir_absen_pulang: jamAkhirAbsenPulang,
    });

    return res.status(201).json({ message: "Berhasil!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
const updateSetting = async (req, res) => {
  try {
    const { jamAwalMasuk, jamAkhirMasuk, jamAwalKeluar, jamAkhirKeluar } =
      req.body;

    await ModelSetting.update(
      {
        jam_absen_datang: jamAwalMasuk,
        jam_akhir_absen_datang: jamAkhirMasuk,
        jam_absen_pulang: jamAwalKeluar,
        jam_akhir_absen_pulang: jamAkhirKeluar,
      },
      {
        where: {
          id_setting: 1,
        },
      }
    );

    return res.status(200).json({ message: "Berhasil!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getSetting = async (req, res) => {
  try {
    const response = await ModelSetting.findByPk(req.params.id);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { createSetting, updateSetting, getSetting };
