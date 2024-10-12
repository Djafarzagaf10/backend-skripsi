const ModelAdmin = require("../models/ModelAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const ModelAbsensi = require("../models/ModelAbsensi");
const { Op } = require("sequelize");
const ModelUser = require("../models/ModelUser");
const fs = require("fs");

const getAdminLogin = async (req, res) => {
  try {
    const response = await ModelAdmin.findOne({ where: { id_admin: req.params.id } })

    return res.status(200).json({ response })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username == "")
      return res
        .status(400)
        .json({ message: "Username tidak boleh kosong!", error: "username" });
    if (password == "")
      return res
        .status(400)
        .json({ message: "Password tidak boleh kosong!", error: "password" });
    const checkUsername = await ModelAdmin.findAll({
      where: { nip: username },
    });
    if (!checkUsername[0])
      return res
        .status(400)
        .json({ message: "Username tidak terdaftar!", error: "username" });
    const match = await bcrypt.compare(password, checkUsername[0].password);
    if (!match)
      return res
        .status(400)
        .json({ message: "Password anda salah!", error: "password" });
    const userId = checkUsername[0].id_admin;
    const name = checkUsername[0].nama;

    const token = jwt.sign({ userId, name }, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    await ModelAdmin.update(
      {
        token: token,
      },
      {
        where: {
          id_admin: userId,
        },
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const data = {
      userId: userId,
    };

    return res.status(200).json({ data, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createAdmin = async (req, res) => {
  try {
    const {
      nip,
      nik,
      nama,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      telpon,
      agama,
      statusNikah,
      alamat,
      jabatan,
    } = req.body;
    if (nip === "")
      return res
        .status(400)
        .json({ message: "NIP tidak boleh kosong!", error: "nip" });
    if (nik === "")
      return res
        .status(400)
        .json({ message: "NIK tidak boleh kosong!", error: "nik" });
    if (nama === "")
      return res
        .status(400)
        .json({ message: "Nama tidak boleh kosong!", error: "nama" });
    if (jenisKelamin === "")
      return res
        .status(400)
        .json({ message: "Pilih Jenis Kelamin!", error: "jenisKelamin" });
    if (tempatLahir === "")
      return res.status(400).json({
        message: "Tempat Lahir tidak boleh kosong!",
        error: "tempatLahir",
      });
    if (tanggalLahir === "")
      return res.status(400).json({
        message: "Tanggal Lahir tidak boleh kosong!",
        error: "tanggalLahir",
      });
    if (telpon === "")
      return res.status(400).json({
        message: "No telpon tidak boleh kosong!",
        error: "tanggalLahir",
      });
    if (agama === "")
      return res.status(400).json({
        message: "Agama tidak boleh kosong!",
        error: "agama",
      });
    if (statusNikah === "")
      return res.status(400).json({
        message: "Status nikah tidak boleh kosong!",
        error: "statusNikah",
      });
    if (alamat === "")
      return res.status(400).json({
        message: "Alamat tidak boleh kosong!",
        error: "alamat",
      });
    if (jabatan === "")
      return res.status(400).json({
        message: "Jabatan tidak boleh kosong!",
        error: "jabatan",
      });

    const checkNip = await ModelAdmin.findAll({ where: { nip: nip } });

    if (checkNip[0])
      return res
        .status(400)
        .json({ message: "NIP sudah terdaftar!", error: "nip" });

    const checkNik = await ModelAdmin.findAll({ where: { nik: nik } });
    if (checkNik[0])
      return res
        .status(400)
        .json({ message: "NIK Sudah terdaftar!", error: "nik" });

    if (req.files === null)
      return res
        .status(400)
        .json({ message: "No File Upload!", error: "foto" });
    const file = req.files.file;
    const filesize = file.data.length;
    const ext = path.extname(file.name);
    const filename = Date.now() + ext;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/public/images/admin/${filename}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({
        message: "Foto harus berupa png,jpg atau jpeg!",
        error: "foto",
      });
    if (filesize > 3000000)
      return res
        .status(422)
        .json({ message: "Foto harus di bawah 3 mb!", error: "foto" });
    file.mv(`./public/images/admin/${filename}`, async (err) => {
      if (err) return res.status(500).json({ message: err.message });
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(nip, salt);

      await ModelAdmin.create({
        nip: nip,
        nik: nik,
        nama: nama,
        jenis_kelamin: jenisKelamin,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
        telpon: telpon,
        agama: agama,
        status_nikah: statusNikah,
        alamat: alamat,
        jabatan: jabatan,
        foto: filename,
        url: url,
        password: hashPassword,
      });

      return res.status(201).json({ message: "Data berhasil di simpan!" });
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const removeToken = async (req, res) => {
  try {
    await ModelAdmin.update(
      {
        token: null,
      },
      {
        where: {
          id_admin: req.params.id,
        },
      }
    );

    res.clearCookie("token");

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getKehadiran = async (req, res) => {
  try {
    const { tanggalAwal, tanggalAkhir } = req.body;
    if (tanggalAwal == "" || tanggalAkhir == "")
      return res
        .status(400)
        .json({ error: "Tanggal awal dan akhir diperlukan." });

    const response = await ModelAbsensi.findAll({
      where: {
        tanggal_absensi: {
          [Op.between]: [new Date(tanggalAwal), new Date(tanggalAkhir)],
        },
        status_absensi: 2,
      },
    });

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getUser = async (req, res) => {
  try {
    const response = await ModelUser.findAll();

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await ModelUser.findByPk(req.params.id)

    if (user) {
      const pathFile = `./public/images/${user.foto}`
      fs.unlinkSync(pathFile)
    }

    await ModelUser.destroy({
      where: {
        id_user: req.params.id
      }
    })

    return res.status(200).json({ message: "User berhasil di hapus!" })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
  loginAdmin,
  createAdmin,
  removeToken,
  getKehadiran,
  getUser,
  getAdminLogin,
  deleteUser
};
