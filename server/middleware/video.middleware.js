const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const fileFilter = (req, file, cb) => {
    const allowedType = ["video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/quicktime", "video/x-ms-wmv", "video/x-flv", "video/x-matroska", "video/3gpp"];
  if (allowedType.includes(file.mimetype)) {
    cb(null, true);
  } else cb(null, false);
};

const promotionalVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

let promotionalVideoUpload = multer({ storage: promotionalVideo, fileFilter });

module.exports = { promotionalVideoUpload };
