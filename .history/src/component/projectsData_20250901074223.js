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
   {
     id: 2,
     img: images[1] || null,
     title: "Portfolio Website",
     category: "Next.js",
     tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
     description:
       "A performant portfolio website with smooth page transitions and responsive design.",
     links: { live: "#", code: "#" },
     videoUrl: "/videos/portfolio-demo.mp4",
   },
   {
     id: 3,
     img: images[2] || null,
     title: "Admin Dashboard",
     category: "React",
     tags: ["React", "Chart.js", "Material UI"],
     description:
       "Comprehensive admin dashboard with data visualization, user management, and analytics.",
     links: { live: "#", code: "#" },
     videoUrl: "/videos/dashboard-demo.mp4",
   },
   {
     id: 4,
     img: images[3] || null,
     title: "News Platform",
     category: "MERN",
     tags: ["MongoDB", "Express", "React", "Node.js"],
     description:
       "Full-stack news aggregation platform with user authentication and content management.",
     links: { live: "#", code: "#" },
     videoUrl: "/videos/news-demo.mp4",
   },
   {
     id: 5,
     img: images[4] || null,
     title: "Social App",
     category: "MERN",
     tags: ["MERN Stack", "Socket.io", "JWT"],
     description:
       "Social media application with real-time updates, friend connections, and activity feeds.",
     links: { live: "#", code: "#" },
     videoUrl: "/videos/social-demo.mp4",
   },
   {
     id: 6,
     img: images[5] || null,
     title: "Booking System",
     category: "Full-Stack",
     tags: ["React", "Node.js", "PostgreSQL"],
     description:
       "Reservation management system with calendar integration and email notifications.",
     links: { live: "#", code: "#" },
     videoUrl: "/videos/booking-demo.mp4",
   },
   {
     id: 7,
     img: images[6] || null,
     title: "Analytics Tool",
     category: "Node.js",
     tags: ["Node.js", "D3.js", "Express"],
     description:
       "Data analytics dashboard with custom visualization and report generation.",
     links: { live: "#", code: "#" },
     videoUrl: "/videos/analytics-demo.mp4",
   },
   {
     id: 8,
     img: images[7] || null,
     title: "Job Board",
     category: "Next.js",
     tags: ["Next.js", "TypeScript", "MongoDB"],
     description:
       "Job listing platform with search filters, applicant tracking, and employer dashboards.",
     links: { live: "#", code: "#" },
     videoUrl: "/videos/jobboard-demo.mp4",
   },
   {
     id: 9,
     img: images[8] || null,
     title: "Product Preview",
     category: "Full-Stack",
     tags: ["React", "Node.js", "Stripe API"],
     description:
       "Interactive product showcase with 360° view, zoom functionality, and checkout process.",
     links: { live: "#", code: "#" },
     videoUrl: "/videos/product-demo.mp4",
   },
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
