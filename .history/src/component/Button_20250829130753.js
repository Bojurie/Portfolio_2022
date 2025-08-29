import React from "react";
import { motion } from "framer-motion";
import "./Button.scss";

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  const baseClasses = `btn btn-${variant} btn-${size} ${className}`.trim();

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClasses}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading ? (
        <span className="button-loading">
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
