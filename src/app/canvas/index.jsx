'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

function Model({ groupRef }) {
  const loader = new OBJLoader();

  useEffect(() => {
    const modelURL = '/reactlogo.obj';

    const material1 = new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.8,
      envMapIntensity: 0.7,
    });

    loader.load(modelURL, (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.material = material1;
        }
      });

      const boundingBox = new THREE.Box3().setFromObject(object);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      object.position.sub(center);

      if (groupRef.current) {
        groupRef.current.add(object);
      }
    });

    return () => {
      if (groupRef.current) {
        groupRef.current.children.forEach((child) => {
          groupRef.current.remove(child);
        });
      }
    };
  }, [groupRef]);

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

const SceneGroup = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      <Model groupRef={groupRef} />
    </group>
  );
};

const Index = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full '>
      <Canvas
        camera={{ position: [0, 0, -14], fov: 25 }}
        onCreated={({ gl, camera, scene }) => {
          camera.lookAt(scene.position);
          camera.updateMatrixWorld();
          scene.fog = new THREE.FogExp2(0x202c43, 0.01, 100);
        }}
      >
        <EffectComposer>
          <Environment files='/ml_gradient_21.hdr' />
          <Lights />
          <SceneGroup />
          <Bloom
            exposure={1}
            bloomStrength={1}
            bloomThreshold={0.1}
            bloomRadius={100}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Index;
