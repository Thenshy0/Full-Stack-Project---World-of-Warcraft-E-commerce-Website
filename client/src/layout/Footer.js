import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links"></div>
        <div className="footer-social">
          <a
            href="https://github.com/Thenshy0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon sx={{ fontSize: 30 }} />
          </a>
          <a
            href="https://www.linkedin.com/in/mercedesz-torok-zy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon sx={{ fontSize: 30 }} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} World of Warcraft Tier-set Shop. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
