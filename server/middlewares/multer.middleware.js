import multer from "multer";

/* File storage */

// Storing the user images and data locally in assets folder with filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); // anytime we need to upload the file we will call upload and it will store the file in storage

export { upload };

