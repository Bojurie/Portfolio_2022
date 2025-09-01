import { useState } from "react";
import { motion } from "framer-motion";

const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="image-container">
      {!loaded && !error && (
        <div className="image-skeleton">
          <div className="skeleton-loader"></div>
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? "loaded" : ""}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
