const ModelFace = require("../models/ModelFace");
const path = require("path");
const fs = require("fs");

module.exports = {
  createFace: async (req, res) => {
    if (req.files === null)
      return res.status(400).json({ message: "No File Upload!" });
    const file = req.files.file;
    const ext = path.extname(file.name);
    const filename = Date.now() + ext;
    const url = `${req.protocol}://${req.get("host")}/public/faces/${filename}`;
    file.mv(`./public/faces/${filename}`, async (err) => {
      if (err) return res.status(500).json({ err });
      const checkFace = await ModelFace.findAll({
        where: {
          user_id: req.params.id,
        },
      });

      try {
        if (checkFace.length > 0) {
          const pathFile = `./public/faces/${checkFace[0].foto}`;
          fs.unlinkSync(pathFile);

          await ModelFace.update(
            {
              foto: filename,
              url: url,
            },
            {
              where: {
                user_id: req.params.id,
              },
            }
          );
        } else {
          await ModelFace.create({
            user_id: req.params.id,
            foto: filename,
            url: url,
          });
        }

        return res
          .status(201)
          .json({ message: "Wajah berhasil di daftafkan!" });
      } catch (error) {
        return res.status(500).json({ error });
      }
    });
  },
};
