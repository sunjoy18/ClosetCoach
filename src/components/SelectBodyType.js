import React from "react";
import "../../src/App.css";
import { Link } from "react-router-dom";

function SelectBodyType() {
  return (
    <>
      <div className="container">
        <div
          className="form-container"
          style={{
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ff068b"
              fill-opacity="1"
              d="M0,192L80,202.7C160,213,320,235,480,224C640,213,800,171,960,170.7C1120,171,1280,213,1360,234.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>

          <h1>Select your Body Type</h1>
          <p style={{ fontsize: "1.4px", textAlign: "center" }}>
            Let us know about your body type and color pallette and upload your
            picture
          </p>

          <button
            className="button"
            style={{
              marginTop: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/select">Choose my body type</Link>
          </button>
          <button
            className="button"
            style={{
              marginTop: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/dont">I don't know my body type</Link>
          </button>
        </div>
      </div>
    </>
  );
}
export default SelectBodyType;
