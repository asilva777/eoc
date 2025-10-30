import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useEOCGame } from "@/lib/stores/useEOCGame";

enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
}

export function PlayerController() {
  const { camera, gl } = useThree();
  const [, getKeys] = useKeyboardControls<Controls>();
  const { decisionsWaiting } = useEOCGame();
  
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const rotation = useRef({ x: 0, y: 0 });
  const isPointerLocked = useRef(false);

  useEffect(() => {
    camera.position.set(0, 2, 15);
    camera.rotation.set(0, 0, 0);

    const canvas = gl.domElement;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isPointerLocked.current) return;

      const sensitivity = 0.002;
      rotation.current.y -= event.movementX * sensitivity;
      rotation.current.x -= event.movementY * sensitivity;
      
      rotation.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.current.x));
    };

    const handleCanvasClick = () => {
      if (!isPointerLocked.current && decisionsWaiting.length === 0) {
        canvas.requestPointerLock();
      }
    };

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === canvas;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPointerLocked.current) {
        document.exitPointerLock();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera, gl, decisionsWaiting]);

  useEffect(() => {
    if (decisionsWaiting.length > 0 && isPointerLocked.current) {
      document.exitPointerLock();
    }
  }, [decisionsWaiting]);

  useFrame((state, delta) => {
    const controls = getKeys();
    
    camera.rotation.x = rotation.current.x;
    camera.rotation.y = rotation.current.y;

    direction.current.set(0, 0, 0);

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(camera.quaternion);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(camera.quaternion);
    right.y = 0;
    right.normalize();

    if (controls.forward) {
      direction.current.add(forward);
    }
    if (controls.back) {
      direction.current.sub(forward);
    }
    if (controls.right) {
      direction.current.add(right);
    }
    if (controls.left) {
      direction.current.sub(right);
    }

    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    const speed = 8;
    const damping = 0.9;

    velocity.current.x = velocity.current.x * damping + direction.current.x * speed * delta;
    velocity.current.z = velocity.current.z * damping + direction.current.z * speed * delta;

    const nextPosition = camera.position.clone().add(velocity.current);
    
    const bounds = { x: 23, z: 18 };
    nextPosition.x = Math.max(-bounds.x, Math.min(bounds.x, nextPosition.x));
    nextPosition.z = Math.max(-bounds.z, Math.min(bounds.z, nextPosition.z));
    nextPosition.y = 2;

    camera.position.copy(nextPosition);
  });

  return null;
}
