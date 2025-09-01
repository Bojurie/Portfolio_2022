import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const LazyComponent = ({ component: Component, ...props }) => {
  const LazyLoadedComponent = lazy(() =>
    import(`./${Component}`).then((module) => ({ default: module.default }))
  );

  return (
    <Suspense
      fallback={
        <motion.div
          className="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading...
        </motion.div>
      }
    >
      <LazyLoadedComponent {...props} />
    </Suspense>
  );
};

export default LazyComponent;
