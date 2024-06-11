import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // You can change this directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize upload variable
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    const allowedFormats = /jpeg|jpg|png|webp/;
    const extname = allowedFormats.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFormats.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WEBP files are allowed.'));
    }
  }
}).single('resume'); // Adjust the field name to 'resume'

