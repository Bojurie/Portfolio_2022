// projectsData.js
// Robust asset loading with filename-based lookup + safe fallbacks

// --- Safe helpers -----------------------------------------------------------
const safeEnv =
  typeof window !== "undefined" && typeof document !== "undefined";

const PUBLIC_URL = safeEnv ? process?.env?.PUBLIC_URL || "" : "";

// Webpack `require.context` guards (works in CRA/Vite w/ plugin; else fallbacks)
const makeCtx = (path, deep, regex) => {
  try {
    // eslint-disable-next-line global-require
    return require.context(path, deep, regex);
  } catch (err) {
    console.warn(`Asset context not found at "${path}". Using empty map.`, err);
    return null;
  }
};

const toMap = (ctx) => {
  if (!ctx) return {};
  const keys = ctx.keys();
  const map = {};
  keys.forEach((k) => {
    const filename = k.replace(/^.\//, ""); // "./file.ext" -> "file.ext"
    map[filename] = ctx(k);
  });
  return map;
};

// --- Build image/video maps --------------------------------------------------
const imageCtx = makeCtx("../images", false, /\.(png|jpe?g|svg|webp)$/);
const videoCtx = makeCtx("../videos", false, /\.(mp4|webm|ogg)$/);

const IMAGES = toMap(imageCtx); // { "demo.png": "/static/media/demo.abc123.png", ... }
const VIDEOS = toMap(videoCtx); // { "clip.mp4": "/static/media/clip.def456.mp4", ... }

// Optional: a tiny inline transparent fallback (no network request)
const TRANSPARENT_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

// Helper: resolve an image by filename or return fallback
const getImage = (filename) => {
  if (!filename) return TRANSPARENT_PNG;
  return (
    IMAGES[filename] || `${PUBLIC_URL}/images/${filename}` || TRANSPARENT_PNG
  );
};

// Helper: resolve a list of video sources (with type) by filenames
const getVideoSources = (filenames = []) => {
  return filenames
    .map((name) => {
      const url =
        VIDEOS[name] || (name ? `${PUBLIC_URL}/videos/${name}` : null);

      if (!url) return null;

      const ext = name.split(".").pop()?.toLowerCase();
      const type =
        ext === "mp4"
          ? "video/mp4"
          : ext === "webm"
          ? "video/webm"
          : ext === "ogg" || ext === "ogv"
          ? "video/ogg"
          : undefined;

      return { src: url, type };
    })
    .filter(Boolean);
};

// --- Data --------------------------------------------------------------------
// Use filename-based references so asset order doesn’t matter.
// Provide both poster (image thumb) and multi-format video sources.

export const projects = [
  {
    id: 1,
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    img: getImage("ecommerce.jpg"), // change to your actual filename in /images
    poster: getImage("ecommerce-poster.jpg"), // optional separate poster; falls back if missing
    videoSources: getVideoSources([
      "ecommerce-demo.mp4",
      "ecommerce-demo.webm",
    ]),
    links: { live: "#", code: "#" },
  },
  {
    id: 2,
    title: "Portfolio Website",
    category: "Next.js",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "A performant portfolio website with smooth page transitions and responsive design.",
    img: getImage("portfolio.jpg"),
    poster: getImage("portfolio-poster.jpg"),
    videoSources: getVideoSources([
      "portfolio-demo.mp4",
      "portfolio-demo.webm",
    ]),
    links: { live: "#", code: "#" },
  },
  {
    id: 3,
    title: "Admin Dashboard",
    category: "React",
    tags: ["React", "Chart.js", "Material UI"],
    description:
      "Comprehensive admin dashboard with data visualization, user management, and analytics.",
    img: getImage("dashboard.jpg"),
    poster: getImage("dashboard-poster.jpg"),
    videoSources: getVideoSources([
      "dashboard-demo.mp4",
      "dashboard-demo.webm",
    ]),
    links: { live: "#", code: "#" },
  },
  {
    id: 4,
    title: "News Platform",
    category: "MERN",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    description:
      "Full-stack news aggregation platform with user authentication and content management.",
    img: getImage("news.jpg"),
    poster: getImage("news-poster.jpg"),
    videoSources: getVideoSources(["news-demo.mp4", "news-demo.webm"]),
    links: { live: "#", code: "#" },
  },
  {
    id: 5,
    title: "Social App",
    category: "MERN",
    tags: ["MERN Stack", "Socket.io", "JWT"],
    description:
      "Social media application with real-time updates, friend connections, and activity feeds.",
    img: getImage("social.jpg"),
    poster: getImage("social-poster.jpg"),
    videoSources: getVideoSources(["social-demo.mp4", "social-demo.webm"]),
    links: { live: "#", code: "#" },
  },
  {
    id: 6,
    title: "Booking System",
    category: "Full-Stack",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "Reservation management system with calendar integration and email notifications.",
    img: getImage("booking.jpg"),
    poster: getImage("booking-poster.jpg"),
    videoSources: getVideoSources(["booking-demo.mp4", "booking-demo.webm"]),
    links: { live: "#", code: "#" },
  },
  {
    id: 7,
    title: "Analytics Tool",
    category: "Node.js",
    tags: ["Node.js", "D3.js", "Express"],
    description:
      "Data analytics dashboard with custom visualization and report generation.",
    img: getImage("analytics.jpg"),
    poster: getImage("analytics-poster.jpg"),
    videoSources: getVideoSources([
      "analytics-demo.mp4",
      "analytics-demo.webm",
    ]),
    links: { live: "#", code: "#" },
  },
  {
    id: 8,
    title: "Job Board",
    category: "Next.js",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    description:
      "Job listing platform with search filters, applicant tracking, and employer dashboards.",
    img: getImage("jobboard.jpg"),
    poster: getImage("jobboard-poster.jpg"),
    videoSources: getVideoSources(["jobboard-demo.mp4", "jobboard-demo.webm"]),
    links: { live: "#", code: "#" },
  },
  {
    id: 9,
    title: "Product Preview",
    category: "Full-Stack",
    tags: ["React", "Node.js", "Stripe API"],
    description:
      "Interactive product showcase with 360° view, zoom functionality, and checkout process.",
    img: getImage("product.jpg"),
    poster: getImage("product-poster.jpg"),
    videoSources: getVideoSources(["product-demo.mp4", "product-demo.webm"]),
    links: { live: "#", code: "#" },
  },
];

// Optional: keep manual ordering for the filter pills
export const categories = [
  "All",
  "React",
  "Next.js",
  "MERN",
  "Full-Stack",
  "Node.js",
];

// SSR-safe iOS check (also detects iPadOS Safari on Apple Silicon)
export const isIOS = () => {
  if (!safeEnv) return false;
  const { userAgent, platform, maxTouchPoints } = navigator || {};
  const iOSPlatforms = [
    "iPad",
    "iPhone",
    "iPod",
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
  ];
  const isAppleTouch = /Mac/.test(userAgent || "") && (maxTouchPoints || 0) > 2;
  return iOSPlatforms.includes(platform) || isAppleTouch;
};
