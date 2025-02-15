import React, { useEffect } from "react";
import "./css/HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

const generate = () => {
  const outfit = `Outfit Combination 1:
- Top: Fitted white linen shirt
- Bottom: Slim-fit beige chinos
- Shoe: Brown leather loafers
- Accessories: Brown woven belt, aviator sunglasses`
  axios
    .post("http://localhost:3001/generate", { outfit })
    .then(({ data }) => {
      console.log("Generate: ", data);
    })
    .catch((err) => {
      console.error("Generate Error: ", err);
    });
}

const Home = () => {

  useEffect(() => {
    generate()
  })

  return (
    <div className="landing-container">
      <header className="header">
        <h1 className="logo">ClosetCoach</h1>
        <p className="tagline">Your Personal AI Stylist</p>
      </header>
      <section className="about">
        <h2 style={{ color: "black" }}>What We Do</h2>
        <p style={{ color: "black" }}>
          ClosetCoach provides AI-driven clothing recommendations tailored to
          your height, body type, and skin tone. Get personalized style advice
          and make fashion choices that enhance your confidence.
        </p>
      </section>
      <section className="features">
        <div className="feature">
          <h3 style={{ color: "black" }}>Personalized Suggestions</h3>
          <p style={{ color: "black" }}>
            Receive outfits curated for your unique look.
          </p>
        </div>
        <div className="feature">
          <h3 style={{ color: "black" }}>AI-Powered Matching</h3>
          <p style={{ color: "black" }}>
            Our AI recommends styles that complement your skin tone and body
            type.
          </p>
        </div>
        <div className="feature">
          <h3 style={{ color: "black" }}>Trendy & Timeless</h3>
          <p style={{ color: "black" }}>
            Explore fashion trends while keeping your personal style.
          </p>
        </div>
      </section>
      <footer className="footer">
        <p>Start Your Fashion Journey with ClosetCoach</p>
        <div style={{ gap: 20 }}>
          <Link className="cta-button" style={{marginRight: 20}} to="/form">
            Get Started
          </Link>
          <Link className="cta-button" to="/recommend">
            Generate Outfit
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
