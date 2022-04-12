import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import './SocialFollow.css';

const SocialFollow = () => {
  return (
    <div class="social-container">
      <h3>Social Follow</h3>
      <a href="https://www.linkedin.com/in/bojurie-rogers-wright/"
        className="linkedin social" target='_blank' rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
      </a>

       <a href="https://www.facebook.com/bojurie.rogers/"
        className="facebook social" target='_blank' rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>

      {/* <a href="https://www.twitter.com/jamesqquick" className="twitter social" target='_blank' rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a> */}

      <a href="https://www.instagram.com/bwrightcodes/"
        className="instagram social" target='_blank' rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      <a href="https://github.com/Bojurie"
        className="github social" target='_blank' rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>

    </div>
  );
}
export default SocialFollow;