import multer from "multer";
import path from "path";

// 1. Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); //  Folder to store temporary uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // get .jpg, .png etc
    const name = file.originalname.replace(/\s+/g, "_").split(".")[0]; 
    const uniqueSuffix = Date.now();
    cb(null, `${name}_${uniqueSuffix}${ext}`);
  },
});

//  File type filter (images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

//  Exported upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max size per file
  },
});
