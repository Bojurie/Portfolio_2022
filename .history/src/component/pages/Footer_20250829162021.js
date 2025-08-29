import { motion } from "framer-motion";
import SocialFollow from "../../SocialFollow";
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="footer-container">
        <div className="footer-content">
          <SocialFollow />

          <motion.div
            className="footer-legal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="footer-copyright">
              © {year} Bojurie Rogers-Wright. All Rights Reserved.
            </p>
            <div className="footer-links">
              <motion.a
                href="/privacy"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Privacy Policy
              </motion.a>
              <span className="divider">•</span>
              <motion.a
                href="/terms"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="footer-accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="glow-bar"></div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
