import multer from "multer";
const storage = multer.memoryStorage();
// File filter for validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = {
        'image/jpeg': true,
        'image/png': true,
        'image/jpg': true,
        'application/pdf': true,
    };

    if (allowedTypes[file.mimetype]) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and PDF allowed'), false);
    }
};
export const singleUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
}).single("file");