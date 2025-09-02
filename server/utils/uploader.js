import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "..", "uploads", "projects");
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

export const projectUpload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB (fits "short video")
    files: 4, // 3 images + 1 video
  },
  fileFilter: (_req, file, cb) => {
    const isImage = /image\/(png|jpe?g|webp|svg)/i.test(file.mimetype);
    const isVideo = /video\/(mp4|webm|ogg|ogv)/i.test(file.mimetype);
    if (isImage || isVideo) return cb(null, true);
    cb(
      new Error(
        "Only images (png,jpg,webp,svg) and videos (mp4,webm,ogg) are allowed"
      )
    );
  },
});

export default projectUpload;
