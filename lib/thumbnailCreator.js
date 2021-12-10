const sharp = require("sharp");

const { Requester } = require("cote");

const requester = new Requester({ name: "thumbnail-image" });

module.exports = async (req, res, next) => {
  try {
    const destination = req.file.destination;
    const filename = req.file.filename;

    requester.send(
      {
        type: "thumbnail-image",
        destination,
        filename,
      },

      (respuesta) => {
        sharp(respuesta.from).resize(100, 100).toFile(respuesta.to);
        req.body.thumbnail = respuesta.to
        next();
      }
    );
  } catch (err) {
    next(err);
  }
};
