import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const date = new Date().getFullYear()

  return (
    <div>
      {/* Footer for the current page */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <p>© {date} Sunfire Sensei. All rights reserved.</p>
        <p>
          Powered by <Link to={"https://github.com/lucky-727"}>Tarun garg</Link>
        </p>
        <p>
          <Link to={"/PrivacyPolicy"}>Privacy Policy </Link> |
          <Link to={"/TermsofService"}> Terms of Service</Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;