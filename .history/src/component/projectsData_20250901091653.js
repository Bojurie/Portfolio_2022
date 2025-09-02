// Alternative simpler projectsData.js (if you prefer)
// src/component/projectsData.js

// Simple static data without require.context
export const getProjects = () => {
  return [
    {
      id: 1,
      title: "E-Commerce UI",
      category: "React",
      tags: ["React", "Redux", "Styled Components"],
      description:
        "A modern e-commerce platform with product filtering, cart functionality, and smooth animations.",
      img: "/images/ecommerce.jpg",
      poster: "/images/ecommerce-poster.jpg",
      videoSources: [
        { src: "/videos/ecommerce-demo.mp4", type: "video/mp4" },
        { src: "/videos/ecommerce-demo.webm", type: "video/webm" },
      ],
      links: { live: "#", code: "#" },
    },
    {
      id: 2,
      title: "Portfolio Website",
      category: "Next.js",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      description:
        "A performant portfolio website with smooth page transitions and responsive design.",
      img: "/images/portfolio.jpg",
      poster: "/images/portfolio-poster.jpg",
      videoSources: [
        { src: "/videos/portfolio-demo.mp4", type: "video/mp4" },
        { src: "/videos/portfolio-demo.webm", type: "video/webm" },
      ],
      links: { live: "#", code: "#" },
    },
    {
      id: 3,
      title: "Admin Dashboard",
      category: "React",
      tags: ["React", "Chart.js", "Material UI"],
      description:
        "Comprehensive admin dashboard with data visualization, user management, and analytics.",
      img: "/images/dashboard.jpg",
      poster: "/images/dashboard-poster.jpg",
      videoSources: [
        { src: "/videos/dashboard-demo.mp4", type: "video/mp4" },
        { src: "/videos/dashboard-demo.webm", type: "video/webm" },
      ],
      links: { live: "#", code: "#" },
    },
    {
      id: 4,
      title: "News Platform",
      category: "MERN",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      description:
        "Full-stack news aggregation platform with user authentication and content management.",
      img: "/images/news.jpg",
      poster: "/images/news-poster.jpg",
      videoSources: [
        { src: "/videos/news-demo.mp4", type: "video/mp4" },
        { src: "/videos/news-demo.webm", type: "video/webm" },
      ],
      links: { live: "#", code: "#" },
    },
    {
      id: 5,
      title: "Social App",
      category: "MERN",
      tags: ["MERN Stack", "Socket.io", "JWT"],
      description:
        "Social media application with real-time updates, friend connections, and activity feeds.",
      img: "/images/social.jpg",
      poster: "/images/social-poster.jpg",
      videoSources: [
        { src: "/videos/social-demo.mp4", type: "video/mp4" },
        { src: "/videos/social-demo.webm", type: "video/webm" },
      ],
      links: { live: "#", code: "#" },
    },
    {
      id: 6,
      title: "Booking System",
      category: "Full-Stack",
      tags: ["React", "Node.js", "PostgreSQL"],
      description:
        "Reservation management system with calendar integration and email notifications.",
      img: "/images/booking.jpg",
      poster: "/images/booking-poster.jpg",
      videoSources: [
        { src: "/videos/booking-demo.mp4", type: "video/mp4" },
        { src: "/videos/booking-demo.webm", type: "video/webm" },
      ],
      links: { live: "#", code: "#" },
    },
    {
      id: 7,
      title: "Analytics Tool",
      category: "Node.js",
      tags: ["Node.js", "D3.js", "Express"],
      description:
        "Data analytics dashboard with custom visualization and report generation.",
      img: "/images/analytics.jpg",
      poster: "/images/analytics-poster.jpg",
      videoSources: [
        { src: "/videos/analytics-demo.mp4", type: "video/mp4" },
        { src: "/videos/analytics-demo.webm", type: "video/webm" },
      ],
      links: { live: "#", code: "#" },
    },
    {
      id: 8,
      title: "Job Board",
      category: "Next.js",
      tags: ["Next.js", "TypeScript", "MongoDB"],
      description:
        "Job listing platform with search filters, applicant tracking, and employer dashboards.",
      img: "/images/jobboard.jpg",
      poster: "/images/jobboard-poster.jpg",
      videoSources: [
        { src: "/videos/jobboard-demo.mp4", type: "video/mp4" },
        { src: "/videos/jobboard-demo.webm", type: "video/webm" },
      ],
      links: { live: "#", code: "#" },
    },
    {
      id: 9,
      title: "Product Preview",
      category: "Full-Stack",
      tags: ["React", "Node.js", "Stripe API"],
      description:
        "Interactive product showcase with 360° view, zoom functionality, and checkout process.",
      img: "/images/product.jpg",
      poster: "/images/product-poster.jpg",
      videoSources: [
        { src: "/videos/product-demo.mp4", type: "video/mp4" },
        { src: "/videos/product-demo.webm", type: "video/webm" },
      ],
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
  if (typeof window === "undefined" || typeof navigator === "undefined")
    return false;

  const { userAgent, platform, maxTouchPoints } = navigator;
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
