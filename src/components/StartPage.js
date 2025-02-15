import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/StartPage.module.css";
import Logo from "./assets/logo.jpeg";

const StartPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.conta}>
        <svg
          className={styles.heroSvg}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="dodgerblue"
            fillOpacity="1"
            d="M0,192L80,202.7C160,213,320,235,480,224C640,213,800,171,960,170.7C1120,171,1280,213,1360,234.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={Logo} alt="ClosetCoach Logo" />
          <h1 className={styles.logoText}>ClosetCoach</h1>
        </div>
        <p className={styles.subtitle}>Welcome to Closet Coach!</p>
        <div className={styles.buttonGroup}>
          <Link className={styles.link} to="/sign">
            <button className={styles.btn}>CREATE ACCOUNT</button>
          </Link>
          <Link className={styles.link} to="/login">
            <button className={styles.btn}>LOG IN</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
