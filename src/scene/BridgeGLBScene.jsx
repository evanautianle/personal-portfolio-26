import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import { Viewscreen } from "../viewscreen/Viewscreen";
import { WarpDrive } from "../viewscreen/WarpDrive";
import { Map } from "../viewscreen/Map";
import CrewManager from "../components/crew/CrewManager";


/* ========================================
   Bridge Model
======================================== */
function BridgeModel({ url, onBounds }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useEffect(() => {
    if (!scene || !ref.current) return;
    const model = ref.current;

    model.traverse((child) => {
      if (child.isMesh) {
        if (!(child.material instanceof THREE.MeshStandardMaterial)) {
          const oldMat = child.material;
          child.material = new THREE.MeshStandardMaterial({
            color: oldMat.color ? oldMat.color : 0xffffff,
            map: oldMat.map || null,
            metalness: 0.2,
            roughness: 0.7,
          });
        }
        child.material.transparent = false;
        child.material.opacity = 1;
        child.material.side = THREE.FrontSide;
        child.material.needsUpdate = true;

        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.x -= center.x;
    model.position.z -= center.z;

    const groundedBox = new THREE.Box3().setFromObject(model);
    model.position.y -= groundedBox.min.y;

    const finalBox = new THREE.Box3().setFromObject(model);
    onBounds(finalBox);
  }, [scene, onBounds]);

  return <primitive object={scene} ref={ref} />;
}

/* ========================================
   Camera Setup (Static)
======================================== */
function CameraSetup({ bounds }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!bounds) return;
    const center = new THREE.Vector3();
    bounds.getCenter(center);

    camera.position.set(center.x, center.y + 1.1, center.z + 13);

    const lookAtTarget = center.clone();
    lookAtTarget.y -= 2;
    camera.lookAt(lookAtTarget);

    camera.near = 0.01;
    camera.far = 1000000;
    camera.updateProjectionMatrix();
  }, [bounds, camera]);

  return null;
}

/* ========================================
   Screen Overlay
======================================== */
function ScreenOverlay() {
  const SCREEN_SCALE = 0.1;
  return (
    <>
      {/* Main viewscreen - made much larger for visibility */}
      <Html position={[0.15, 3.1, -8]} transform zIndexRange={[0, 0]} scale={SCREEN_SCALE}>
        <div style={{ width: "2550px", height: "1440px", background: "#000" }}>
          <Viewscreen />
        </div>
      </Html>

      {/* Left side screen - GitHub logo and link */}
      <Html
        position={[-9, 0.7, -7.6]}
        rotation={[0, Math.PI / 2.3, 0]}
        transform
        zIndexRange={[0, 0]}
        scale={SCREEN_SCALE}
      >
        <a
          href="https://github.com/evanautianle"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "2100px",
            height: "450px",
            background: "#111",
            borderRadius: 24,
            opacity: 0.92,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            style={{ width: 220, height: 220, marginRight: 32 }}
          />
          <span
            style={{
              color: '#fff',
              fontSize: 100,
              fontWeight: 700,
              letterSpacing: 2,
              textShadow: '0 2px 8px #000a',
              fontFamily: 'inherit',
            }}
          >
            GITHUB ACCESS TERMINAL
          </span>
        </a>
      </Html>

      {/* Left secondary viewscreen */}
      <Html
        position={[-5.05, 2.35, -7.6]}
        rotation={[0, Math.PI / 5, 0]}
        transform
        zIndexRange={[0, 0]}
        scale={SCREEN_SCALE}
      >
        <div
          style={{
            width: "1100px",
            height: "950px",
            borderRadius: 24,
            opacity: 0.95,
            overflow: "hidden",
          }}
        >
          <WarpDrive />
        </div>
      </Html>

      {/* Right secondary viewscreen */}
      <Html
        position={[5.35, 2.25, -7.6]}
        rotation={[0, -Math.PI / 5, 0]}
        transform
        zIndexRange={[0, 0]}
        scale={SCREEN_SCALE}
      >
        <div
          style={{
            width: "1100px",
            height: "950px",
            borderRadius: 24,
            opacity: 0.95,
            overflow: "hidden",
          }}
        >
          <Map />
        </div>
      </Html>

      {/* Right side screen - LinkedIn logo and link, styled like left */}
      <Html
        position={[9.15, 0.8, -7.6]}
        rotation={[0, -Math.PI / 2.3, 0]}
        transform
        zIndexRange={[0, 0]}
        scale={SCREEN_SCALE}
      >
        <a
          href="https://www.linkedin.com/in/evanautianle"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "2100px",
            height: "450px",
            background: "#111",
            borderRadius: 24,
            opacity: 0.92,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 448 448"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: 32 }}
          >
            <path d="M100.28 448H7.4V148.9h92.88zm-46.44-338.7c-29.5 0-53.36-24-53.36-53.5C.48 26.1 24.34 2 53.84 2c29.5 0 53.36 24.1 53.36 53.8 0 29.5-23.86 53.5-53.36 53.5zm394.34 338.7h-92.68V302.4c0-34.7-12.4-58.4-43.4-58.4-23.7 0-37.8 16-44 31.4-2.3 5.6-2.8 13.4-2.8 21.3v151.3h-92.68s1.2-245.7 0-270.1h92.68v38.3c-.2.3-.5.7-.7 1h.7v-1c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.8 106.7 125.4V448z"
              fill="white"
              fillOpacity="0.92"
            />
          </svg>
          <span
            style={{
              color: '#fff',
              fontSize: 100,
              fontWeight: 700,
              letterSpacing: 2,
              textShadow: '0 2px 8px #000a',
              fontFamily: 'inherit',
            }}
          >
            LINKEDIN ACCESS TERMINAL
          </span>
        </a>
      </Html>
    </>
  );
}

/* ========================================
   Main Scene
======================================== */
export default function BridgeGLBScene({ glbUrl, redAlert }) {
  const [bounds, setBounds] = useState(null);
  const [captainSpeech, setCaptainSpeech] = useState("");
  const speechTimeout = useRef();

  // Listen for custom events from the UI for plotting course and engage
  useEffect(() => {
    function handleSpeechEvent(e) {
      if (!e.detail || !e.detail.type) return;
      if (speechTimeout.current) clearTimeout(speechTimeout.current);
      if (e.detail.type === "plot-course") {
        setCaptainSpeech("Helm, lay in a course for sector " + (e.detail.sector || "2813") + ".");
        speechTimeout.current = setTimeout(() => setCaptainSpeech(""), 2500);
      } else if (e.detail.type === "engage") {
        setCaptainSpeech("Engage.");
        speechTimeout.current = setTimeout(() => setCaptainSpeech(""), 2000);
      }
    }
    window.addEventListener("captain-speech", handleSpeechEvent);
    return () => {
      window.removeEventListener("captain-speech", handleSpeechEvent);
      if (speechTimeout.current) clearTimeout(speechTimeout.current);
    };
  }, []);

  // Red alert color
  const normalColor = "#cfe6ff";
  const alertColor = "#ff2222";
  const lightColor = redAlert ? alertColor : normalColor;

  return (
    <Canvas
      shadows
      camera={{ fov: 38, near: 0.01, far: 1000000 }}
      style={{ width: "100vw", height: "100vh", background: "#101010" }}
    >
      {/* Soft ambient light */}
      <ambientLight intensity={0.03} color={redAlert ? alertColor : undefined} />

      {/* Ring-style lights around the bridge */}
      <pointLight position={[0, 2.7, -7.6]} intensity={7.005} distance={7} decay={2} color={lightColor} />
      <pointLight position={[-4.5, 2, -7.6]} intensity={2.008} distance={2.5} decay={2} color={lightColor} />
      <pointLight position={[4.5, 2, -7.6]} intensity={2.008} distance={2.5} decay={2} color={lightColor} />
      {/* Ring of small point lights around the bridge */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <pointLight
            key={i}
            position={[x, 1.8, z]}
            intensity={2}
            distance={12}
            decay={2}
            color={lightColor}
            castShadow={false}
          />
        );
      })}

      {/* Load the bridge model */}
      <BridgeModel url={glbUrl} onBounds={setBounds} />

      {/* CrewManager spawns all crew */}
      <CrewManager captainSpeech={captainSpeech} />

      {/* Static camera setup (safe to render even if bounds is null) */}
      {bounds && <CameraSetup bounds={bounds} />}

      {/* Overlay screens always rendered */}
      <ScreenOverlay />
    </Canvas>
  );
}
