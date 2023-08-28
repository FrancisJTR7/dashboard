'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Center, Environment } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

function Model() {
  const { scene } = useThree();
  const modelRef = useRef();
  const loader = new OBJLoader();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    const modelURL = '/Porcelain_Pose.obj';

    const material1 = new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.8,
      envMapIntensity: 0.75,
    });

    loader.load(modelURL, (object) => {
      modelRef.current = object;

      object.traverse((child) => {
        if (child.isMesh) {
          child.material = material1;
        }
      });

      object.position.y = -100;
      scene.add(object);
    });

    return () => {
      if (modelRef.current) scene.remove(modelRef.current);
    };
  }, [scene]);

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
}

const Index = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full z-1'>
      <Canvas
        camera={{ position: [0, 0, -700], fov: 25 }}
        onCreated={({ gl, camera, scene }) => {
          camera.lookAt(scene.position);
          camera.updateMatrixWorld();
        }}
      >
        <EffectComposer>
          <Lights />
          <Environment files='/gradient1.hdr' />
          <Center alignTop={false}>
            <Model />
          </Center>
          <Bloom
            exposure={1}
            bloomStrength={2}
            bloomThreshold={0.1}
            bloomRadius={10}
            luminanceThreshold={0}
            luminanceSmoothing={1}
            intensity={0.1}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Index;
