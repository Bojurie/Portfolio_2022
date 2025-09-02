// src/middleware/upload.js
import fs from "fs";
import path from "path";
import multer from "multer";

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const base = path.join(process.cwd(), "uploads", "projects");
    ensureDir(base);
    cb(null, base);
  },
  filename(req, file, cb) {
    const ts = Date.now();
    const safe = file.originalname.replace(/\s+/g, "-").toLowerCase();
    cb(null, `${ts}-${safe}`);
  },
});

// limits ~ 10 MB per image, 25 MB per video (tweak as needed)
const limits = { fileSize: 25 * 1024 * 1024 };

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  const isImage = /^image\/(png|jpe?g|webp|gif|svg\+xml)$/.test(mimetype);
  const isVideo = /^(video\/mp4|video\/webm|video\/ogg)$/.test(mimetype);

  if (file.fieldname === "images" && isImage) return cb(null, true);
  if (file.fieldname === "video" && isVideo) return cb(null, true);

  cb(new Error("Unsupported file type"));
};

const upload = multer({ storage, limits, fileFilter });

// export a fields middleware: up to 3 images, 1 video
export const projectMediaFields = upload.fields([
  { name: "images", maxCount: 3 },
  { name: "video", maxCount: 1 },
]);
