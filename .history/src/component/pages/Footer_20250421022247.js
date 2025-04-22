import React from "react";
import SocialFollow from "../../SocialFollow";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-wrapper">
          <SocialFollow />
          <p className="footer-copy">
            © {year} Bojurie Rogers-Wright. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
