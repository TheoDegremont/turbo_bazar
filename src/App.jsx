import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useHelper, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import {Suspense, use, useRef, useState} from 'react'
import { KeyboardControls, useKeyboardControls } from '@react-three/drei'
import { Physics, RigidBody } from '@react-three/rapier'


function McQueen() {

  const model = useGLTF('/lightning_mcqueen_cars_3/scene.gltf')
  const rigidRef = useRef()
  const [rotationY, setRotationY] = useState(0)

  const forward = useKeyboardControls(state => state.forward)
  const backward = useKeyboardControls(state => state.backward)
  const left = useKeyboardControls(state => state.left)
  const right = useKeyboardControls(state => state.right)

  useFrame(() => {
    if (!rigidRef.current) return
    const curVel = rigidRef.current.linvel();
  
    const speed = 100
    const rotationSpeed = 0.1
    let direction = [0, 0, 0]
  
    if (forward) {
      direction[0] += Math.sin(rotationY) * speed
      direction[2] += Math.cos(rotationY) * speed
    }
    if (backward) {
      direction[0] -= Math.sin(rotationY) * speed
      direction[2] -= Math.cos(rotationY) * speed
    }
    if (left) setRotationY(prev => prev + rotationSpeed)
    if (right) setRotationY(prev => prev - rotationSpeed)
  
    // 💡 Appliquer la rotation correctement
    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotationY, 0))
  
    rigidRef.current.setLinvel({ x: direction[0], y: curVel.y, z: direction[2] }, true)
    rigidRef.current.setRotation(quaternion, true)
  })
  return (
    <RigidBody
      ref={rigidRef}
      type="dynamic"
      colliders="trimesh"
      restitution={0.3}
      friction={1}
      gravityScale={10}
      mass={100}
      position={[0, 0, -450]}
    >
      <primitive object={model.scene} scale={20} />
    </RigidBody>
  )
}




function MysteryMachine() {
  const model = useGLTF('/mystery_machine_scooby-doo/scene.gltf')
  const rigidRef = useRef()
  const [rotationY, setRotationY] = useState(Math.PI)


  const forward = useKeyboardControls(state => state.forward)
  const backward = useKeyboardControls(state => state.backward)
  const left = useKeyboardControls(state => state.left)
  const right = useKeyboardControls(state => state.right)

  useFrame(() => {
    if (!rigidRef.current) return
    const curVel = rigidRef.current.linvel();

    const speed = 100
    const rotationSpeed = 0.1
    let direction = [0, 0, 0]

    if (forward) {
      direction[0] += Math.sin(rotationY) * speed
      direction[2] += Math.cos(rotationY) * speed
    }
    if (backward) {
      direction[0] -= Math.sin(rotationY) * speed
      direction[2] -= Math.cos(rotationY) * speed
    }
    if (left) setRotationY(prev => prev + rotationSpeed)
    if (right) setRotationY(prev => prev - rotationSpeed)

    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotationY, 0))

    rigidRef.current.setLinvel({ x: direction[0], y: curVel.y, z: direction[2] }, true)
    rigidRef.current.setRotation(quaternion, true)
  })

  return (
    <RigidBody
      ref={rigidRef}
      type="dynamic"
      colliders="trimesh"
      restitution={0.3}
      gravityScale={10}
      friction={1}
      mass={100}
      position={[0, 0, 450]}
    >
      <primitive object={model.scene} scale={2} />
    </RigidBody>
  )
}





function SoccerBall() {
  const model = useGLTF('/soccer_ball/scene.gltf')
  return (

    <RigidBody type="dynamic" colliders="ball" restitution={0.6} friction={0.5} mass={10} gravityScale={10}>
  <primitive object={model.scene} scale={15} position={[5, 30, 0]} />
</RigidBody>
  )
}




function Field() {
    const texture = useLoader(THREE.TextureLoader, '/terrain.png')

    texture.center.set(0.5, 0.5)
    texture.rotation = Math.PI / 2

    return (
    <RigidBody type="fixed"  friction={1}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[720, 1300]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </RigidBody>
    )
}




//Les murs invisbles
function Walls() {
  const wallHeight = 600
  const wallThickness = 10
  const fieldWidth = 720
  const fieldLength = 1300

  const texture = useLoader(THREE.TextureLoader, '/gradin.png')
 // Ajuste selon ton image

  return (
    <>
      {/* Mur avant */}
      <RigidBody type="fixed" restitution={1}>
        <mesh position={[0, wallHeight / 2, -fieldLength / 2]}>
          <boxGeometry args={[fieldWidth, wallHeight, wallThickness]} />
          <meshStandardMaterial map={texture}/>
        </mesh>
      </RigidBody>

      {/* Mur arrière */}
      <RigidBody type="fixed" restitution={1}>
        <mesh position={[0, wallHeight / 2, fieldLength / 2]}>
          <boxGeometry args={[fieldWidth, wallHeight, wallThickness]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </RigidBody>

      {/* Mur gauche */}
      <RigidBody type="fixed" restitution={1}>
        <mesh position={[-fieldWidth / 2, wallHeight / 2, 0]}>
          <boxGeometry args={[wallThickness, wallHeight, fieldLength]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>

      {/* Mur droit */}
      <RigidBody type="fixed" restitution={1}>
        <mesh position={[fieldWidth / 2, wallHeight / 2, 0]}>
          <boxGeometry args={[wallThickness, wallHeight, fieldLength]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </RigidBody>
    </>
  )
}


function Goals() {
    const goalWidth = 198
    const goalHeight = 80
    const goalDepth = -150
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
      <Canvas camera={{ position: [-650, 350, 0], fov: 80 }}>

            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
            <Physics>
            <Suspense fallback={null}>
                <Field />
                <Walls />
                <Goals />

                {/* Player 1 - McQueen avec ZQSD */}
                <KeyboardControls
                    map={[
                        { name: "forward", keys: ["w", "z"] },
                        { name: "backward", keys: ["s"] },
                        { name: "left", keys: ["a", "q"] },
                        { name: "right", keys: ["d"] },
                    ]}
                >
                    <McQueen />
                </KeyboardControls>

                {/* Player 2 - MysteryMachine avec les flèches */}
                <KeyboardControls
                    map={[
                        { name: "forward", keys: ["ArrowUp"] },
                        { name: "backward", keys: ["ArrowDown"] },
                        { name: "left", keys: ["ArrowLeft"] },
                        { name: "right", keys: ["ArrowRight"] },
                    ]}
                >
                    <MysteryMachine />
                </KeyboardControls>

                <SoccerBall />
                <OrbitControls enableDamping />
            </Suspense>
            </Physics>
        </Canvas>
    )
}



export default App
