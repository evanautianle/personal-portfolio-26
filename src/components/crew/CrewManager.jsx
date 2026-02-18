import React from "react";
import Captain from "./Captain";
import HelmOfficer from "../../characters/HelmOfficer";
import OpsOfficer from "../../characters/OpsOfficer";

export default function CrewManager({ captainSpeech }) {
  return (
    <>
      <Captain speech={captainSpeech} />
      <HelmOfficer />
      <OpsOfficer />
    </>
  );
}
