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




function Field() {
    const texture = useLoader(THREE.TextureLoader, '/terrain.png')

    texture.center.set(0.5, 0.5)
    texture.rotation = Math.PI / 2

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[720, 1060]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}




function Walls() {
    const wallHeight = 600
    const wallThickness = 10
    const fieldWidth = 720
    const fieldLength = 1000

    return (
        <>
            <mesh position={[0, wallHeight / 2, -fieldLength / 2]}>
                <boxGeometry args={[fieldWidth, wallHeight, wallThickness]} />
                <meshStandardMaterial color="white" transparent opacity={0} />
            </mesh>

            <mesh position={[0, wallHeight / 2, fieldLength / 2]}>
                <boxGeometry args={[fieldWidth, wallHeight, wallThickness]} />
                <meshStandardMaterial color="white" transparent opacity={0} />
            </mesh>

            <mesh position={[-fieldWidth / 2, wallHeight / 2, 0]}>
                <boxGeometry args={[wallThickness, wallHeight, fieldLength]} />
                <meshStandardMaterial color="white" transparent opacity={0} />
            </mesh>

            <mesh position={[fieldWidth / 2, wallHeight / 2, 0]}>
                <boxGeometry args={[wallThickness, wallHeight, fieldLength]} />
                <meshStandardMaterial color="white" transparent opacity={0} />
            </mesh>
        </>
    )
}


function Goals() {
    const goalWidth = 200
    const goalHeight = 80
    const goalDepth = 50
    const postThickness = 5

    return (
        <>
            <group position={[0, 0, -500]}>
                <mesh position={[-goalWidth / 2, goalHeight / 2, goalDepth / 2]}>
                    <boxGeometry args={[postThickness, goalHeight, postThickness]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
                <mesh position={[goalWidth / 2, goalHeight / 2, goalDepth / 2]}>
                    <boxGeometry args={[postThickness, goalHeight, postThickness]} />
                    <meshStandardMaterial color="gray" />
                </mesh>

                <mesh position={[0, goalHeight, goalDepth / 2]}>
                    <boxGeometry args={[goalWidth, postThickness, postThickness]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
            </group>

            <group position={[0, 0, 500]}>
                <mesh position={[-goalWidth / 2, goalHeight / 2, -goalDepth / 2]}>
                    <boxGeometry args={[postThickness, goalHeight, postThickness]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
                <mesh position={[goalWidth / 2, goalHeight / 2, -goalDepth / 2]}>
                    <boxGeometry args={[postThickness, goalHeight, postThickness]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
                <mesh position={[0, goalHeight, -goalDepth / 2]}>
                    <boxGeometry args={[goalWidth, postThickness, postThickness]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
            </group>
        </>
    )
}





function App() {
    return (
        <Canvas camera={{ position: [0, 70, 70], fov: 75 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
            <Suspense fallback={null}>
                <Field />
                <Walls />
                <Goals />
                <McQueen />
                <MysteryMachine />
                <SoccerBall />
                <OrbitControls enableDamping />
            </Suspense>
        </Canvas>
    )
}


export default App
