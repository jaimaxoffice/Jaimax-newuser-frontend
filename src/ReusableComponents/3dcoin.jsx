import React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import defaultIcon from "../../assets/coin.jpg"; 
function CoinMesh({
  rotationSpeed = 0.8,
  textureSrc = defaultIcon,
  edgeColor = "#b59c2bff",
}) {
  const texture = useLoader(THREE.TextureLoader, textureSrc);
  const coinRef = React.useRef();
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 48;
  texture.needsUpdate = true;

  useFrame((_, delta) => {
    if (coinRef.current) {
      coinRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  return (
    <group ref={coinRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.18, 64]} />
        <meshStandardMaterial
          color="#FFD700"   
          metalness={0.3}     
          roughness={0.4}     
        />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[1.18, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0}
          roughness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Back */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.1]}>
        <circleGeometry args={[1.18, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0}
          roughness={0.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
export default function Coin3D({
  className = "",
  orbit = false,
  rotationSpeed = 0.8,
  edgeColor = "#b59c2bff",
  ambientColor = "#b5ae25ff",
  textureSrc = defaultIcon,
}) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
        <ambientLight intensity={1.2} color={ambientColor} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <directionalLight position={[-3, -3, 3]} intensity={1.2} />
        <pointLight position={[0, 0, 5]} intensity={1.2} />

        <CoinMesh
          rotationSpeed={rotationSpeed}
          edgeColor={edgeColor}
          textureSrc={textureSrc}
        />

        {orbit && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
  );
}
