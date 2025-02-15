import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import pear from "./assets/pear2.jpg";
import hrgls from "./assets/hrgls2.jpg";
import rect from "./assets/rectangle2.jpg";
import invert from "./assets/invrtri.jpg";
import apple from "./assets/apple2.jpg";
import "../../src/App.css";

function SelectPage() {
  const [selectedBodyType, setselectedBodyType] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const handleImageClick = (bodyType) => {
    setselectedBodyType(bodyType);
    setFormErrors({});
    setIsSubmit(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(selectedBodyType);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      const email = localStorage.getItem("email");
      axios
        .post("http://localhost:3001/select-body-type", {
          bodyType: selectedBodyType,
          email,
        })
        .then((response) => {
          console.log("body type saved:", response.data);
          navigate("/col");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validate = (selectedBodyType) => {
    const errors = {};
    if (!selectedBodyType) {
      errors.bodyType = "Please Select Your BodyType";
    }
    return errors;
  };

  return (
    <div className="contain1" style={{ height: "150vh", width: "100vw" }}>
      <div className="cont2" style={{ width: "1000px", height: "950px" }}>
        {Object.keys(formErrors).length === 0 && isSubmit && (
          <div className="success-message"></div>
        )}

        <div className="inner">
          <form onSubmit={handleSubmit}>
            <h1>Choose Your BodyType</h1>
            <div className="images">
              <div
                className={`image ${
                  selectedBodyType === "Pear" ? "selected" : ""
                }`}
                style={{ backgroundImage: `url(${pear})` }}
                onClick={() => handleImageClick("Pear")}
              >
                <div className="label">Pear</div>
              </div>
              <div
                className={`image ${
                  selectedBodyType === "HourGlass" ? "selected" : ""
                }`}
                style={{ backgroundImage: `url(${hrgls})` }}
                onClick={() => handleImageClick("HourGlass")}
              >
                <div className="label">HourGlass</div>
              </div>
              <div
                className={`image ${
                  selectedBodyType === "Inverted Triangle" ? "selected" : ""
                }`}
                style={{ backgroundImage: `url(${invert})` }}
                onClick={() => handleImageClick("Inverted Triangle")}
              >
                <div className="label">Inverted Triangle</div>
              </div>
            </div>

            <div className="imagee">
              <div
                className={`image ${
                  selectedBodyType === "Rectangle" ? "selected" : ""
                }`}
                style={{ backgroundImage: `url(${rect})` }}
                onClick={() => handleImageClick("Rectangle")}
              ></div>
              <div
                className={`image ${
                  selectedBodyType === "Apple" ? "selected" : ""
                }`}
                style={{ backgroundImage: `url(${apple})` }}
                onClick={() => handleImageClick("Apple")}
              ></div>
            </div>
            {formErrors.bodyType && (
              <p style={{ textAlign: "center" }} className="error-message">
                {formErrors.bodyType}
              </p>
            )}
            {selectedBodyType && (
              <div className="selected-body-type">
                <h2>You selected: {selectedBodyType}</h2>
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <button type="submit" className="button">
                NEXT
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "8px",
              }}
            >
              <button className="button">
                <Link to="/Boty">Go Back</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SelectPage;
