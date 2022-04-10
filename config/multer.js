const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public/uploads/" + req.body.campaignId)) {
      fs.mkdirSync("public/uploads/" + req.body.campaignId);
    }
    cb(null, "public/uploads/" + req.body.campaignId);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).array("files");
