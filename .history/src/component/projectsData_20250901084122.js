// src/component/projectsData.js

// Lazily build assets to avoid TDZ/circular import issues with HMR
const safeEnv =
  typeof window !== "undefined" && typeof document !== "undefined";
const PUBLIC_URL = safeEnv ? process?.env?.PUBLIC_URL || "" : "";

// Try/catch require.context so this also works in non-CRA setups
const makeCtx = (path, deep, regex) => {
  try {
    // eslint-disable-next-line global-require
    return require.context(path, deep, regex);
  } catch {
    return null;
  }
};

const toMap = (ctx) => {
  if (!ctx) return {};
  const map = {};
  ctx.keys().forEach((k) => {
    const filename = k.replace(/^.\//, "");
    map[filename] = ctx(k);
  });
  return map;
};

const getImageFrom = (IMAGES, filename) => {
  if (!filename) return null;
  return IMAGES[filename] || `${PUBLIC_URL}/images/${filename}`;
};

const getVideoSourcesFrom = (VIDEOS, filenames = []) =>
  filenames
    .map((name) => {
      if (!name) return null;
      const src = VIDEOS[name] || `${PUBLIC_URL}/videos/${name}`;
      const ext = name.split(".").pop()?.toLowerCase();
      const type =
        ext === "mp4"
          ? "video/mp4"
          : ext === "webm"
          ? "video/webm"
          : ext === "ogv" || ext === "ogg"
          ? "video/ogg"
          : undefined;
      return { src, type };
    })
    .filter(Boolean);

// --- PUBLIC API -------------------------------------------------------------

// Use this instead of a top-level `export const projects = [...]`
export const getProjects = () => {
  // Build maps lazily at call time (prevents TDZ with HMR)
  const imageCtx = makeCtx("../images", false, /\.(png|jpe?g|svg|webp)$/);
  const videoCtx = makeCtx("../videos", false, /\.(mp4|webm|ogg|ogv)$/);

  const IMAGES = toMap(imageCtx);
  const VIDEOS = toMap(videoCtx);

  const img = (f) => getImageFrom(IMAGES, f);
  const vids = (arr) => getVideoSourcesFrom(VIDEOS, arr);

  return [
    {
      id: 1,
      title: "E-Commerce UI",
      category: "React",
      tags: ["React", "Redux", "Styled Components"],
      description:
        "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
      img: img("ecommerce.jpg"),
      poster: img("ecommerce-poster.jpg") || img("ecommerce.jpg"),
      videoSources: vids(["ecommerce-demo.mp4", "ecommerce-demo.webm"]),
      links: { live: "#", code: "#" },
    },
    {
      id: 2,
      title: "Portfolio Website",
      category: "Next.js",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      description:
        "A performant portfolio website with smooth page transitions and responsive design.",
      img: img("portfolio.jpg"),
      poster: img("portfolio-poster.jpg") || img("portfolio.jpg"),
      videoSources: vids(["portfolio-demo.mp4", "portfolio-demo.webm"]),
      links: { live: "#", code: "#" },
    },
    {
      id: 3,
      title: "Admin Dashboard",
      category: "React",
      tags: ["React", "Chart.js", "Material UI"],
      description:
        "Comprehensive admin dashboard with data visualization, user management, and analytics.",
      img: img("dashboard.jpg"),
      poster: img("dashboard-poster.jpg") || img("dashboard.jpg"),
      videoSources: vids(["dashboard-demo.mp4", "dashboard-demo.webm"]),
      links: { live: "#", code: "#" },
    },
    {
      id: 4,
      title: "News Platform",
      category: "MERN",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      description:
        "Full-stack news aggregation platform with user authentication and content management.",
      img: img("news.jpg"),
      poster: img("news-poster.jpg") || img("news.jpg"),
      videoSources: vids(["news-demo.mp4", "news-demo.webm"]),
      links: { live: "#", code: "#" },
    },
    {
      id: 5,
      title: "Social App",
      category: "MERN",
      tags: ["MERN Stack", "Socket.io", "JWT"],
      description:
        "Social media application with real-time updates, friend connections, and activity feeds.",
      img: img("social.jpg"),
      poster: img("social-poster.jpg") || img("social.jpg"),
      videoSources: vids(["social-demo.mp4", "social-demo.webm"]),
      links: { live: "#", code: "#" },
    },
    {
      id: 6,
      title: "Booking System",
      category: "Full-Stack",
      tags: ["React", "Node.js", "PostgreSQL"],
      description:
        "Reservation management system with calendar integration and email notifications.",
      img: img("booking.jpg"),
      poster: img("booking-poster.jpg") || img("booking.jpg"),
      videoSources: vids(["booking-demo.mp4", "booking-demo.webm"]),
      links: { live: "#", code: "#" },
    },
    {
      id: 7,
      title: "Analytics Tool",
      category: "Node.js",
      tags: ["Node.js", "D3.js", "Express"],
      description:
        "Data analytics dashboard with custom visualization and report generation.",
      img: img("analytics.jpg"),
      poster: img("analytics-poster.jpg") || img("analytics.jpg"),
      videoSources: vids(["analytics-demo.mp4", "analytics-demo.webm"]),
      links: { live: "#", code: "#" },
    },
    {
      id: 8,
      title: "Job Board",
      category: "Next.js",
      tags: ["Next.js", "TypeScript", "MongoDB"],
      description:
        "Job listing platform with search filters, applicant tracking, and employer dashboards.",
      img: img("jobboard.jpg"),
      poster: img("jobboard-poster.jpg") || img("jobboard.jpg"),
      videoSources: vids(["jobboard-demo.mp4", "jobboard-demo.webm"]),
      links: { live: "#", code: "#" },
    },
    {
      id: 9,
      title: "Product Preview",
      category: "Full-Stack",
      tags: ["React", "Node.js", "Stripe API"],
      description:
        "Interactive product showcase with 360° view, zoom functionality, and checkout process.",
      img: img("product.jpg"),
      poster: img("product-poster.jpg") || img("product.jpg"),
      videoSources: vids(["product-demo.mp4", "product-demo.webm"]),
      links: { live: "#", code: "#" },
    },
  ];
};

export const categories = [
  "All",
  "React",
  "Next.js",
  "MERN",
  "Full-Stack",
  "Node.js",
];

// SSR-safe iOS detection
export const isIOS = () => {
  if (!safeEnv) return false;
  const { userAgent = "", platform = "", maxTouchPoints = 0 } = navigator || {};
  const iOSPlatforms = [
    "iPad",
    "iPhone",
    "iPod",
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
  ];
  const isAppleTouch = /Mac/.test(userAgent) && maxTouchPoints > 2;
  return iOSPlatforms.includes(platform) || isAppleTouch;
};
