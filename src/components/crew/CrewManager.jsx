import React from "react";
import Captain from "./Captain";
import HelmOfficer from "../../characters/HelmOfficer";
import OpsOfficer from "../../characters/OpsOfficer";
import WanderingOfficer from "../../characters/WanderingOfficer";
import { NAVIGATION_BOUNDS } from "../../scene/navigationBounds";

export default function CrewManager({ captainSpeech }) {
  return (
    <>
      <Captain speech={captainSpeech} />
      <HelmOfficer />
      <OpsOfficer />
      {/* Add 3 wandering officers */}
      <WanderingOfficer bounds={NAVIGATION_BOUNDS} />
      <WanderingOfficer bounds={NAVIGATION_BOUNDS} />
      <WanderingOfficer bounds={NAVIGATION_BOUNDS} />
    </>
  );
}
