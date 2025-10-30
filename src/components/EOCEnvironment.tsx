import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Box } from "@react-three/drei";
import { useEOCGame } from "@/lib/stores/useEOCGame";

export function EOCEnvironment() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.3} />
      
      <Floor />
      <Walls />
      <CommandZone />
      <OperationsZone />
      <LogisticsZone />
      <PlanningZone />
      <FinanceZone />
      <Ceiling />
    </>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 40]} />
      <meshStandardMaterial color="#e0e0e0" />
    </mesh>
  );
}

function Ceiling() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
      <planeGeometry args={[50, 40]} />
      <meshStandardMaterial color="#f5f5f5" side={THREE.DoubleSide} />
    </mesh>
  );
}

function Walls() {
  return (
    <group>
      <mesh position={[0, 2.5, -20]} castShadow>
        <boxGeometry args={[50, 5, 0.5]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      
      <mesh position={[0, 2.5, 20]} castShadow>
        <boxGeometry args={[50, 5, 0.5]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      
      <mesh position={[-25, 2.5, 0]} castShadow>
        <boxGeometry args={[0.5, 5, 40]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      
      <mesh position={[25, 2.5, 0]} castShadow>
        <boxGeometry args={[0.5, 5, 40]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
    </group>
  );
}

function ZoneBase({ 
  position, 
  color, 
  label, 
  labelTagalog,
  zoneId 
}: { 
  position: [number, number, number]; 
  color: string; 
  label: string;
  labelTagalog: string;
  zoneId: string;
}) {
  const { setCurrentZone } = useEOCGame();
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && isHovered) {
      meshRef.current.position.y = 0.15 + Math.sin(Date.now() * 0.003) * 0.05;
    } else if (meshRef.current) {
      meshRef.current.position.y = 0.15;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[8, 0.3, 6]}
        position={[0, 0.15, 0]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => setCurrentZone(zoneId)}
      >
        <meshStandardMaterial 
          color={isHovered ? new THREE.Color(color).multiplyScalar(1.3) : color} 
          emissive={color}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
        />
      </Box>
      
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
      
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {labelTagalog}
      </Text>
      
      <mesh position={[0, 1.5, -3]} castShadow>
        <boxGeometry args={[7, 2.5, 0.2]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      
      <mesh position={[-3, 0.8, 2]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1]} />
        <meshStandardMaterial color="#718096" />
      </mesh>
      
      <mesh position={[3, 0.8, 2]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1]} />
        <meshStandardMaterial color="#718096" />
      </mesh>
    </group>
  );
}

function CommandZone() {
  return (
    <ZoneBase
      position={[0, 0, -12]}
      color="#1e40af"
      label="COMMAND CENTER"
      labelTagalog="Sentro ng Komando"
      zoneId="command"
    />
  );
}

function OperationsZone() {
  return (
    <ZoneBase
      position={[-12, 0, 0]}
      color="#dc2626"
      label="OPERATIONS"
      labelTagalog="Operasyon"
      zoneId="operations"
    />
  );
}

function LogisticsZone() {
  return (
    <ZoneBase
      position={[12, 0, 0]}
      color="#16a34a"
      label="LOGISTICS"
      labelTagalog="Lohístika"
      zoneId="logistics"
    />
  );
}

function PlanningZone() {
  return (
    <ZoneBase
      position={[-12, 0, 12]}
      color="#9333ea"
      label="PLANNING"
      labelTagalog="Pagpaplano"
      zoneId="planning"
    />
  );
}

function FinanceZone() {
  return (
    <ZoneBase
      position={[12, 0, 12]}
      color="#ea580c"
      label="FINANCE/ADMIN"
      labelTagalog="Pananalapi/Admin"
      zoneId="finance"
    />
  );
}
