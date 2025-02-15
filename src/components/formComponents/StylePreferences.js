import React, { useEffect, useState } from "react";
import classic from '../assets/OverallStyle/classic.jpg'
import modern from '../assets/OverallStyle/modern.avif'
import bohemian from '../assets/OverallStyle/Bohemian.webp'

export default function StylePreferences({ instruction, setInstruction }) {
  const [formValues, setFormValues] = useState({
    overallStyle: "",
    clothingPreferences: [],
    fitPreference: "",
  });

  useEffect(() => {
    if (instruction) {
      setFormValues({
        overallStyle: instruction.overallStyle || "",
        clothingPreferences: instruction.clothingPreferences || [],
        fitPreference: instruction.fitPreference || "",
      });
    }
  }, [instruction]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prev) => {
      let updatedValues;
      if (type === "checkbox") {
        updatedValues = checked
          ? [...prev.clothingPreferences, value]
          : prev.clothingPreferences.filter((item) => item !== value);
      } else {
        updatedValues = value;
      }

      const newValues = {
        ...prev,
        [name]: updatedValues,
      };

      setInstruction((prev) => ({ ...prev, [name]: updatedValues }));
      return newValues;
    });
  };

  const overAllStyle = [
    {
      label: "Classic",
      value: "Classic",
      src: classic,
    },
    {
      label: "Modern",
      value: "Modern",
      src: modern,
    },
    {
      label: "Bohemian",
      value: "Bohemian",
      src: bohemian,
    },
  ];

  return (
    <div className="step-container">
      <h2>Style Preferences</h2>
      <div className="form-group">
        <label htmlFor="overallStyle">Overall Style:</label>
        <div className="image-options">
          {overAllStyle.map((style) => (
            <div className="image-option" key={style?.value}>
              <label
                htmlFor={`overAllStyle-${style?.value}`}
                style={{
                  cursor: "pointer",
                  borderRadius: "5px",
                  padding: "2px",
                  transition: "border 0.3s ease",
                }}
              >
                <img
                  src={style.src}
                  alt={style.label}
                  width={100}
                  height={100}
                  style={{
                    border:
                      formValues.overallStyle === style.value
                        ? "2px solid #ff06b8"
                        : "2px solid transparent",
                  }}
                />
                <div>
                  <input
                    type="radio"
                    id={`overAllStyle-${style.value}`}
                    name="overallStyle"
                    value={style.value}
                    checked={formValues.overallStyle === style.value}
                    onChange={handleChange}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {style.label}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Clothing Preferences:</label>
        <div className="checkbox-group">
          {["dresses", "skirts", "pants", "jeans"].map((item) => (
            <div key={item}>
              <input
                type="checkbox"
                id={item}
                name="clothingPreferences"
                value={item}
                checked={formValues.clothingPreferences.includes(item)}
                onChange={handleChange}
              />
              <label htmlFor={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="fitPreference">Fit Preference:</label>
        <select
          id="fitPreference"
          name="fitPreference"
          value={formValues.fitPreference}
          onChange={handleChange}
        >
          <option value="">Select your fit preference</option>
          <option value="fitted">Fitted</option>
          <option value="semi-fitted">Semi-fitted</option>
          <option value="loose">Loose</option>
          <option value="oversized">Oversized</option>
        </select>
      </div>
    </div>
  );
}
