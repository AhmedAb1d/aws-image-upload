const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype === 'image/png') {
    //         cb(null, true);
    //     } else {
    //         cb(new Error('Only PNG images are allowed'));
    //     }
    // }
});

module.exports = upload;