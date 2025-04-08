"use client";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Stars } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "./Loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Astro = ({ isMobile }) => {
  const astro = useLoader(GLTFLoader, "./Astro/scene.gltf");
  let mixer;
  if (astro.animations.length) {
    mixer = new THREE.AnimationMixer(astro.scene);
    astro.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  useFrame((state, delta) => {
    mixer?.update(delta);
  });

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor='blue' />

      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} />
      <primitive
        object={astro.scene}
        scale={isMobile ? 6 : 5}
        position={isMobile ? [0, -3.5, -2.2] : [0, -3.25, -1.5]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const AstroCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 0, 15], fov: 35 }}
      gl={{ preserveDrawingBuffer: true }}
      //   style={{ background: "#d1d1d154" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Astro isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default AstroCanvas;
