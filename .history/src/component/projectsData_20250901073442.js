// projectsData.js
const importAll = (r) => {
  return r.keys().map(r);
};

let images = [];
try {
  images = importAll(
    require.context("../images", false, /\.(png|jpe?g|svg|webp)$/)
  );
} catch (error) {
  console.warn("Images not found, using fallback:", error);
  images = Array(9).fill(null);
}

export const projects = [
  {
    id: 1,
    img: images[0] || null,
    title: "E-Commerce UI",
    category: "React",
    tags: ["React", "Redux", "Styled Components"],
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
    links: { live: "#", code: "#" },
    videoUrl: "/videos/ecommerce-demo.mp4",
  },
  // ... (other projects)
];

export const categories = [
  "All",
  "React",
  "Next.js",
  "MERN",
  "Full-Stack",
  "Node.js",
];

// Check if device is iOS
export const isIOS = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};
