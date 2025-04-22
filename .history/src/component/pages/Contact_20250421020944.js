import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Button from "../Button";
import "./Contact.css";

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sgy2c6a",
        "template_hlu2f0r",
        form.current,
        "user_ekwueKu8ixfoPD5a4qf2n"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitted(true);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">
          <span className="highlighted">4.</span> Contact
        </h2>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Let’s Talk</h3>
            <p>
              Have a question, collaboration idea, or just want to connect? Send
              me a message and I’ll get back to you as soon as I can.
            </p>
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact-form">
            {submitted && (
              <p className="success-message">
                ✅ Message sent! Thanks for reaching out.
              </p>
            )}

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" name="name" id="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                id="message"
                rows="6"
                required
              ></textarea>
            </div>

            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
