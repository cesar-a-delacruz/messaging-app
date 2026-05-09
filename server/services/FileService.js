const dotenv = require("dotenv");
const { cloudinary } = require("../configs/fileConfig.js");

dotenv.config();

module.exports = {
  upload: async (name, fileBuffer, path) => {
    let response;
    await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `${process.env.CLOUDINARY_FOLDER}${path ? "/" + path : ""}`,
            display_name: name,
          },
          (error, result) => {
            if (error) return reject(error);
            return resolve(result);
          },
        )
        .end(fileBuffer);
    })
      .then((result) => {
        console.info(result);
        response = result;
      })
      .catch((error) => {
        console.error(error);
        response = error;
      });
    return response;
  },
  delete: async (url) => {
    let response;
    await new Promise((resolve) => {
      const result = cloudinary.api.delete_resources([
        url.substring(
          url.lastIndexOf(process.env.CLOUDINARY_FOLDER),
          url.lastIndexOf("."),
        ),
      ]);
      resolve(result);
    }).then((result) => {
      console.log(result);
      response = result;
    });
    return response;
  },
};
