import multer from "multer";
import fs from "fs";
import path from "path";

const tempDir = path.join(process.cwd(), "Public", "temp");

// Create folder if it doesn't exist
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },

    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

export const upload = multer({
    storage,
});
