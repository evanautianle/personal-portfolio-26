import React from "react";
import Captain from "./members/Captain";
import HelmOfficer from "./members/HelmOfficer";
import OpsOfficer from "./members/OpsOfficer";
import CommsOfficer from "./members/CommsOfficer";
import WanderingOfficer from "./members/WanderingOfficer";
import { NAVIGATION_BOUNDS } from "../../scene/navigationBounds";

export default function CrewManager({ captainSpeech }) {
  return (
    <>
      <Captain speech={captainSpeech} />
      <HelmOfficer />
      <OpsOfficer />
      <CommsOfficer />
      {/* Add 3 wandering officers */}
      <WanderingOfficer bounds={NAVIGATION_BOUNDS} />
      <WanderingOfficer bounds={NAVIGATION_BOUNDS} />
      <WanderingOfficer bounds={NAVIGATION_BOUNDS} />
    </>
  );
}
