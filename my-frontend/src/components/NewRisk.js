import React from "react";
import RiskForm from "./RiskForm";

function NewRisk() {
  return (
    <div className="container">
      <h2>Add New Risk</h2>
      <RiskForm onRiskAdded={() => {}} />
    </div>
  );
}

export default NewRisk;
