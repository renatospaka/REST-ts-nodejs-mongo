import * as multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cBack) {
    cBack(null, "uploads/");
  },
  filename: function(req, file, cBack) {
    cBack(null, file.originalname);
  }
});

const uploads = multer({ storage: storage });

export default uploads;