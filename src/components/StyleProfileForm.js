import StepWizard from "react-multistep";
import CoreBodyInfo from "./formComponents/CoreBodyInfo";
import StylePreferences from "./formComponents/StylePreferences";
import AdditionalInfo from "./formComponents/AdditionalInfo";
import PersonalStyle from "./formComponents/PersonalStyle";

import "./styles.css";
import { useState } from "react";

export default function StyleProfileForm() {
  const [instruction, setInstruction] = useState({});
  return (
    <div className="form-container">
      {/* <h1>Style Profile Form</h1> */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StepWizard>
          <CoreBodyInfo
            stepName="Body Info"
            instruction={instruction}
            setInstruction={setInstruction}
          />
          <StylePreferences
            stepName="Style"
            instruction={instruction}
            setInstruction={setInstruction}
          />
          <AdditionalInfo
            stepName="Additional"
            instruction={instruction}
            setInstruction={setInstruction}
          />
          <PersonalStyle
            stepName="Personal"
            instruction={instruction}
            setInstruction={setInstruction}
          />
        </StepWizard>
      </div>
    </div>
  );
}
