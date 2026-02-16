import React from "react";
import Captain from "./Captain";
import HelmOfficer from "../../characters/HelmOfficer";
import OpsOfficer from "../../characters/OpsOfficer";

export default function CrewManager() {
  return (
    <>
      <Captain />
      <HelmOfficer />
      <OpsOfficer />
    </>
  );
}
