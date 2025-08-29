import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck } from "react-icons/fi";
import Button from "../Button";
import "./Contact.scss";

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setSubmitted(true);
          setIsLoading(false);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setSubmitted(false), 5000);
        },
        (error) => {
          console.error("Error sending message:", error);
          setIsLoading(false);
        }
      );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-grid-overlay" />

      <div className="contact-container">
        <motion.h2
          className="section-title"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <span className="highlight">05.</span> Connect With Me
        </motion.h2>

        <motion.div
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="contact-info-content">
              <h3 className="contact-subtitle">
                <span className="text-gradient">Let's Build</span> The Future
              </h3>

              <motion.p className="contact-text" variants={itemVariants}>
                Ready to discuss your next groundbreaking project? I specialize
                in turning{" "}
                <span className="text-highlight">visionary ideas</span> into
                <span className="text-highlight"> digital reality</span>.
              </motion.p>

              <div className="contact-details">
                {[
                  {
                    icon: <FiMail />,
                    title: "Email",
                    value: "hello@bwrightcodes.com",
                    link: "mailto:hello@bwrightcodes.com",
                  },
                  {
                    icon: <FiMapPin />,
                    title: "Location",
                    value: "New York, USA",
                    link: null,
                  },
                  {
                    icon: <FiPhone />,
                    title: "Call",
                    value: "+1 (555) 123-4567",
                    link: "tel:+15551234567",
                  },
                ].map((item, index) => (
                  <motion.div
                    className="contact-item"
                    key={index}
                    variants={itemVariants}
                    custom={index}
                  >
                    <div className="contact-icon-container">{item.icon}</div>
                    <div className="contact-item-content">
                      <h4>{item.title}</h4>
                      {item.link ? (
                        <a href={item.link} className="contact-link">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-value">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            variants={itemVariants}
          >
            <div className="form-grid-overlay" />

            <motion.form
              ref={form}
              onSubmit={sendEmail}
              className="contact-form"
              variants={itemVariants}
            >
              {submitted && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="success-message-content">
                    <div className="success-icon-container">
                      <FiCheck />
                    </div>
                    <div>
                      <h4>Message Received!</h4>
                      <p>I'll respond within 24 hours</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <span className="label-text">Your Name</span>
                  <span className="label-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your name"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="label-text">Email Address</span>
                  <span className="label-asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <span className="label-text">Your Message</span>
                  <span className="label-asterisk">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="Tell me about your project..."
                  disabled={isLoading}
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={isLoading}
                className="form-submit"
              >
                <FiSend className="button-icon" />
                Send Message
              </Button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
