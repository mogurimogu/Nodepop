const multer = require("multer");
const path = require("path")

const uploader = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  }),

  fieldSize: 5242880,

  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});
module.exports = uploader;
