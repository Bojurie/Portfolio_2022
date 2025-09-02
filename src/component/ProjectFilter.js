import React, { memo } from "react";
import { motion } from "framer-motion";

const ProjectFilter = memo(
  ({ categories, activeCategory, onCategoryChange }) => {
    return (
      <motion.div
        className="project-tabs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`tab-button ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => onCategoryChange(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
    );
  }
);

export default ProjectFilter;
