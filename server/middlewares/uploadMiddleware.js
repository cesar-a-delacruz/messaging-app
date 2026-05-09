const { upload } = require("../configs/fileConfig.js");

module.exports = async (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to upload file", error })
        .end();
    }
    next();
  });
};
