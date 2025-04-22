import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import Button from "../Button";
import "./Contact.css";

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        "service_sgy2c6a",
        "template_hlu2f0r",
        form.current,
        "user_ekwueKu8ixfoPD5a4qf2n"
      )
      .then(
        (result) => {
          setSubmitted(true);
          setIsLoading(false);
          setTimeout(() => setSubmitted(false), 5000);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setIsLoading(false);
        }
      );
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="highlight">05.</span> Get In Touch
        </motion.h2>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-subtitle">Let's Collaborate</h3>
            <p className="contact-text">
              Have a project in mind or want to discuss opportunities? I'm
              currently available for freelance work and open to new
              connections.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>hello@bwrightcodes.com</span>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>New York, USA</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className="contact-form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                ✅ Message sent! I'll get back to you within 24 hours.
              </motion.div>
            )}

            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="form-input"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                name="message"
                id="message"
                rows="6"
                required
                className="form-textarea"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <Button type="submit" className="form-submit" disabled={isLoading}>
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <FiSend style={{ marginRight: "8px" }} />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
