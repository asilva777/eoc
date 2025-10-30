import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useEOCGame } from "./lib/stores/useEOCGame";
import { Menu } from "./components/Menu";
import { EOCEnvironment } from "./components/EOCEnvironment";
import { PlayerController } from "./components/PlayerController";
import { GameHUD } from "./components/GameHUD";
import { DecisionPanel } from "./components/DecisionPanel";
import { ScenarioManager } from "./components/ScenarioManager";
import { EndScreen } from "./components/EndScreen";
import "@fontsource/inter";

enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
}

const controls = [
  { name: Controls.forward, keys: ["KeyW", "ArrowUp"] },
  { name: Controls.back, keys: ["KeyS", "ArrowDown"] },
  { name: Controls.left, keys: ["KeyA", "ArrowLeft"] },
  { name: Controls.right, keys: ["KeyD", "ArrowRight"] },
];

function App() {
  const { phase } = useEOCGame();

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <KeyboardControls map={controls}>
        {phase === 'menu' && <Menu />}

        {(phase === 'tutorial' || phase === 'active_scenario') && (
          <>
            <Canvas
              shadows
              camera={{
                position: [0, 2, 15],
                fov: 60,
                near: 0.1,
                far: 1000
              }}
              gl={{
                antialias: true,
                powerPreference: "default"
              }}
            >
              <color attach="background" args={["#87CEEB"]} />

              <Suspense fallback={null}>
                <EOCEnvironment />
                <PlayerController />
              </Suspense>
            </Canvas>
            
            <GameHUD />
            <DecisionPanel />
            <ScenarioManager />
          </>
        )}

        {phase === 'ended' && <EndScreen />}
      </KeyboardControls>
    </div>
  );
}

export default App;
