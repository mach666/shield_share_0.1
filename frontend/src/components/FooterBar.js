import React from "react";
import "./FooterStyle.css";
function FooterBar() {
  return (
    <footer>
      <div className="copyright text-center">
        Copyright &copy; 2021{" "}
        <span>
          <a href="https://www.codersarts.com/">www.codersarts.com</a>
        </span>
      </div>
    </footer>
  );
}

export default FooterBar;
