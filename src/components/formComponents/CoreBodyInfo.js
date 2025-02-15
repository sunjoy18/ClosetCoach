import React, { useEffect, useState } from "react";
import pear from "../assets/pear2.jpg";
import hrgls from "../assets/hrgls2.jpg";
import rect from "../assets/rectangle2.jpg";
import invert from "../assets/invrtri.jpg";
import apple from "../assets/apple2.jpg";

export default function CoreBodyInfo({ instruction, setInstruction }) {
  const [formValues, setFormValues] = useState({
    height: "",
    bodyShape: "",
    build: "",
  });

  useEffect(() => {
    if (instruction) {
      setFormValues({
        height: instruction.height || "",
        bodyShape: instruction.bodyShape || "",
        build: instruction.build || "",
      });
    }
  }, [instruction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name : ", name, " value : ", value);
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setInstruction((prev) => ({ ...prev, [name]: value }));
  };

  const shapes = [
    {
      label: "Hourglass",
      value: "hourglass",
      src: hrgls,
    },
    {
      label: "Pear",
      value: "pear",
      src: pear,
    },
    {
      label: "Apple",
      value: "apple",
      src: apple,
    },
    {
      label: "Rectangle",
      value: "rectangle",
      src: rect,
    },
    {
      label: "Inverted Triangle",
      value: "inverted-triangle",
      src: invert,
    },
  ];

  return (
    <div className="step-container">
      <h2>Core Body Information</h2>
      <div className="form-group">
        <label htmlFor="height">Height:</label>
        <select
          id="height"
          name="height"
          value={formValues.height}
          onChange={handleChange}
        >
          <option value="">Select your height</option>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="tall">Tall</option>
        </select>
      </div>
      <div className="form-group">
        <label>Body Shape:</label>
        <div className="image-options">
          {shapes.map((shape) => (
            <div className="image-option" key={shape.value}>
              <label
                htmlFor={`bodyShape-${shape.value}`}
                style={{
                  cursor: "pointer",

                  borderRadius: "5px",
                  padding: "2px",
                  transition: "border 0.3s ease",
                }}
              >
                <img
                  src={shape.src}
                  alt={shape.label}
                  width={100}
                  height={100}
                  style={{
                    border:
                      formValues.bodyShape === shape.value
                        ? "2px solid #ff06b8"
                        : "2px solid transparent",
                  }}
                />
                <div>
                  <input
                    type="radio"
                    id={`bodyShape-${shape.value}`}
                    name="bodyShape"
                    value={shape.value}
                    checked={formValues.bodyShape === shape.value}
                    onChange={handleChange}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {shape.label}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="build">Build:</label>
        <select
          id="build"
          name="build"
          value={formValues.build}
          onChange={handleChange}
        >
          <option value="">Select your build</option>
          <option value="thin">Thin</option>
          <option value="lean">Lean</option>
          <option value="average">Average</option>
          <option value="stocky">Stocky</option>
          <option value="large-framed">Large-framed</option>
        </select>
      </div>
    </div>
  );
}
