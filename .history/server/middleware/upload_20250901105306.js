import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir) =>
  !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = file.mimetype.startsWith("image/")
      ? "uploads/images"
      : "uploads/videos";
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

const fileFilter = (_req, file, cb) => {
  const ok =
    IMAGE_TYPES.includes(file.mimetype) || VIDEO_TYPES.includes(file.mimetype);
  cb(ok ? null : new Error("Unsupported file type"), ok);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max (videos); images will be smaller anyway
    files: 4, // total files (3 images + 1 video)
  },
});

// Expect fields: images[] (max 3), video (max 1)
export const projectMediaFields = upload.fields([
  { name: "images", maxCount: 3 },
  { name: "video", maxCount: 1 },
]);
