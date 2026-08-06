const { upload } = require("../configs/fileConfig.js");

module.exports = async (fileField, req, res, next) => {
  upload.single(fileField)(req, res, (error) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to upload ${fileField}.` })
        .end();
    }
    next();
  });
};
