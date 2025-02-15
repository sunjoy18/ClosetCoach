import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PersonalStyle({ instruction, setInstruction }) {
  const [personalStyle, setPersonalStyle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (instruction?.personalStyle) {
      setPersonalStyle(instruction.personalStyle);
    }
  }, [instruction]);

  const handleChange = (e) => {
    setPersonalStyle(e.target.value);
    setInstruction((prev) => ({ ...prev, personalStyle: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Instruction : ", instruction);

    try {
      const userId = localStorage.getItem("userId");
      const url = "http://localhost:3001/instruction/";

      axios
        .post(url, { userId: userId, instruction: instruction })
        .then(({ data }) => {
          console.log("Form response: ", data);

          if (data?.success) {
            navigate("/home");
          } else {
            alert("Something went wrong.");
          }
        })
        .catch((err) => {
          console.error("Form Error: ", err);
          alert("Something went wrong. Please try again.");
        });
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <form className="step-container" onSubmit={handleSubmit}>
      <h2>Personal Style Description</h2>

      <div className="form-group">
        <label htmlFor="personalStyle">
          In a few words, describe your personal style:
        </label>
        <textarea
          id="personalStyle"
          name="personalStyle"
          rows={4}
          placeholder="e.g., Chic and comfortable with a touch of bohemian flair"
          value={personalStyle}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group">
        <button type="submit" className="submit-button">
          Generate Style Profile
        </button>
      </div>
    </form>
  );
}
