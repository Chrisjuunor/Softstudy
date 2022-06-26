const multer = require("multer");

const imgUpload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("file must be png,jpeg or jpg file"));
    }
    cb(undefined, true);
  },
});
const videoUpload = multer({
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.mp4$/)) {
      cb(new Error("file must be mp4 file"));
    }
    cb(undefined, true);
  },
});

module.exports = { imgUpload, videoUpload };
