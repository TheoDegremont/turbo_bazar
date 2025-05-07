import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useHelper, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, use, useRef } from 'react'
import { KeyboardControls, useKeyboardControls } from '@react-three/drei'

function McQueen() {
  const model = useGLTF('/lightning_mcqueen_cars_3/scene.gltf')
  return (
    
    <mesh position={[0, 0, 0]} scale={10}>
      <primitive object={model.scene} />
    </mesh>
  )
}

function MysteryMachine() {
  const model = useGLTF('/the_mystery_machine/scene.gltf')
  return (
    
    <mesh position={[50, 0, 50]} scale={10} rotation={[0, Math.PI / 2, 0]}>
      <primitive object={model.scene} />
    </mesh>
  )
}

function SoccerBall() {
  const model = useGLTF('/soccer_ball/scene.gltf')
  return (
    
    <mesh position={[25, 0, 0]} scale={10}>
      <primitive object={model.scene} />
    </mesh>
  )
}




function App() {
  
  return (
    <Canvas camera={{ position: [0, 50, 50], fov: 75 }}>
      <ambientLight intensity={5} />
      <Suspense fallback={null}>
        <McQueen />
        <MysteryMachine />
        <SoccerBall />
        <OrbitControls enableDamping />
      </Suspense>
    </Canvas>
  )
}

export default App
