import React, { useEffect, useState } from "react";

export default function AdditionalInfo({ instruction, setInstruction }) {
  const [formValues, setFormValues] = useState({
    specificFeatures: "",
    ageRange: "",
    occupation: "",
    comfortVsStyle: 50,
  });

  useEffect(() => {
    if (instruction) {
      setFormValues({
        specificFeatures: instruction.specificFeatures || "",
        ageRange: instruction.ageRange || "",
        occupation: instruction.occupation || "",
        comfortVsStyle: instruction.comfortVsStyle ?? 50,
      });
    }
  }, [instruction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      const newValues = { ...prev, [name]: value };
      setInstruction((prev) => ({ ...prev, [name]: value }));
      return newValues;
    });
  };

  return (
    <div className="step-container">
      <h2>Additional Considerations</h2>

      <div className="form-group">
        <label htmlFor="specificFeatures">
          Specific Features to Highlight:
        </label>
        <input
          type="text"
          id="specificFeatures"
          name="specificFeatures"
          placeholder="e.g., Broad shoulders, Long legs"
          value={formValues.specificFeatures}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="ageRange">Age Range (Optional):</label>
        <select
          id="ageRange"
          name="ageRange"
          value={formValues.ageRange}
          onChange={handleChange}
        >
          <option value="">Prefer not to say</option>
          <option value="teens">Teens</option>
          <option value="20s">20s</option>
          <option value="30s">30s</option>
          <option value="40s">40s</option>
          <option value="50s+">50s+</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="occupation">Occupation/Lifestyle:</label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          placeholder="e.g., Office worker, Athlete"
          value={formValues.occupation}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="comfortVsStyle">Comfort vs. Style Priority:</label>
        <input
          type="range"
          id="comfortVsStyle"
          name="comfortVsStyle"
          min="0"
          max="100"
          step="10"
          value={formValues.comfortVsStyle}
          onChange={handleChange}
        />
        <div className="range-labels">
          <span>Comfort</span>
          <span>Balance</span>
          <span>Style</span>
        </div>
      </div>
    </div>
  );
}
