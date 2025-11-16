import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import './Three.scss'
import SunWithHelpers from '../Helpers/SunWithHelpers'

function Rig({ children }: { children: React.ReactNode }) {
  const { pointer, viewport } = useThree()
  const g = useRef<THREE.Group>(null!)

  useFrame((_state, dt) => {
    const targetRotX = THREE.MathUtils.clamp(pointer.y * 0.15, -0.2, 0.2)
    const targetRotY = THREE.MathUtils.clamp(pointer.x * -0.25, -0.35, 0.35)
    const targetX = THREE.MathUtils.clamp(pointer.x * (viewport.width * 0.05), -1, 1)
    const targetY = THREE.MathUtils.clamp(pointer.y * (viewport.height * 0.05), -1, 1)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, targetRotX, 4, dt)
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, targetRotY, 4, dt)
    g.current.position.x = THREE.MathUtils.damp(g.current.position.x, targetX, 4, dt)
    g.current.position.y = THREE.MathUtils.damp(g.current.position.y, targetY, 4, dt)
  })

  return <group ref={g}>{children}</group>
}

function Layer({ depth, strength, color, layerNum }: { depth: number; strength: number; color: string; layerNum: number }) {
  const m = useRef<THREE.Mesh>(null!)
  const deep: number = .05
  const texture = useLoader(THREE.TextureLoader, 'texture-white-paper.jpg')
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1.5, 1.5);
  //
  const texture1 = useLoader(THREE.TextureLoader, 'texture-white-paper1.jpg');
        texture1.wrapS = THREE.RepeatWrapping;
        texture1.wrapT = THREE.RepeatWrapping;
        texture1.repeat.set(.1, .1);

  const texture2 = useLoader(THREE.TextureLoader, 'texture-white-paper2.jpg');
        texture2.wrapS = THREE.RepeatWrapping;
        texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set(7, 7);

  useFrame((state, dt) => {
    const { pointer } = state
    m.current.position.x = THREE.MathUtils.damp(m.current.position.x, pointer.x * strength, 5, dt)
    m.current.position.y = THREE.MathUtils.damp(m.current.position.y, pointer.y * strength, 5, dt)
  })

  if (layerNum === 0) {
    return (
      <group ref={m}>
        <mesh position={[0, 0, depth]} castShadow receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial roughness={0.85} color={color} map={texture} />
        </mesh>
      </group>
    )
  }
  if (layerNum === 1) {
    return (
      <group ref={m}>
        <mesh position={[2, 2, depth]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, deep, 50]}  />
          <meshStandardMaterial roughness={0.85} color={color} map={texture1} />
        </mesh>
      </group>
    )
  }
  if (layerNum >= 20 && layerNum <= 29) {
    return (
      <group ref={m}>
        <mesh position={[2, 2, depth]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, deep, 50]}  />
          <meshStandardMaterial roughness={0.85} color={color} map={texture} />
        </mesh>
      </group>
    )
  }

  if (layerNum >= 10 && layerNum <= 19) {
    const posXY: number = (layerNum === 14) ? 0 : 2
    return (
      <group ref={m}>
        <mesh position={[posXY, posXY, depth - 0.03]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[15, layerNum - 8, .01, 50, 2, true ]}   />
          <meshStandardMaterial roughness={0.85} color={color} />
        </mesh>
        <mesh position={[posXY, posXY, depth]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[layerNum - 8, 15, .01, 50, 2, true ]}   />
          <meshStandardMaterial roughness={0.85} color={color} map={texture} />
        </mesh>
      </group>
    )
  }

  if (layerNum >= 30 && layerNum <= 38) {
    const size: number = .7
    let posX: number = -2 
    let posY: number = 2 

    switch (layerNum) {
      case 30:
          posX = -2
          posY =  2
        break;
      case 31:
          posX = -5
          posY =  3
        break;
      case 32:
          posX = 4.5
          posY = 3
        break;
    }

    return (
      <group ref={m}>
        <mesh position={[posX-1.1, posY-.10, depth - .16]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[size - .4, size - .4, deep, 50]}  />
          <meshStandardMaterial roughness={0.85} color={color} map={texture1} />
        </mesh>
        <mesh position={[posX-.7, posY-.15, depth - .08]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[size - .3, size - .3, deep, 50]}  />
          <meshStandardMaterial roughness={0.85} color={color} map={texture1} />
        </mesh>
        <mesh position={[posX, posY, depth ]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[size, size, deep, 50]}  />
          <meshStandardMaterial roughness={0.85} color={color} map={texture1} />
        </mesh>
        <mesh position={[posX+.7, posY-.15, depth - .08]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[size - .3, size - .3, deep, 50]}  />
          <meshStandardMaterial roughness={0.85} color={color} map={texture1} />
        </mesh>
      </group>
      )
  }

  if (layerNum === 39) {
    return (
      <group ref={m}>
        <mesh position={[-5, -5, depth]} rotation={[0,0,Math.PI / 4]} castShadow receiveShadow>
          <boxGeometry args={[10, 10, .05]} />
          <meshStandardMaterial roughness={0.85} color={color} map={texture} />
        </mesh>
        <mesh position={[-5.5, 1.35, depth + .02]} rotation={[0,0,Math.PI / 4]} castShadow receiveShadow>
          <boxGeometry args={[.5, .5, .05]} />
          <meshStandardMaterial roughness={0.85} color={'#fff'} map={texture1} />
        </mesh>
        <mesh position={[-5, 1.5, depth + .02]} rotation={[0,0,Math.PI / 4]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, .05]} />
          <meshStandardMaterial roughness={0.85} color={'#fff'} map={texture1} />
        </mesh>
        <mesh position={[-4.5, 1.35, depth + .02]} rotation={[0,0,Math.PI / 4]} castShadow receiveShadow>
          <boxGeometry args={[.5, .5, .05]} />
          <meshStandardMaterial roughness={0.85} color={'#fff'} map={texture1} />
        </mesh>
      </group>
    )
  }

  if (layerNum >= 40 && layerNum <= 49) {
    const posX: number = (layerNum === 41)? -6 : 6
    return (
      <group ref={m}>
        <mesh position={[posX, -(layerNum + 20), depth]} rotation={[Math.PI / 2,0,0]} castShadow receiveShadow>
          <cylinderGeometry args={[60, 60, deep, 70]}  />
          <meshStandardMaterial roughness={0.85} color={color} map={texture2} />
        </mesh>
      </group>
    )
  }
 
  return (
    <mesh ref={m} position={[0, 0, depth]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, .05]} />
      <meshStandardMaterial roughness={0.85} color={color} opacity={0} />
    </mesh>
  )

}

function Tree({ depth, strength, colors, position, scale }: { depth: number; strength: number; colors: Array<string>; position: Array<number>; scale: number }) {
  const m = useRef<THREE.Mesh>(null!)
  const deep: number = .05
  const texture3 = useLoader(THREE.TextureLoader, 'texture-white-paper3.jpg');
        texture3.wrapS = THREE.RepeatWrapping;
        texture3.wrapT = THREE.RepeatWrapping;
        texture3.repeat.set(.05, .05);

  useFrame((state, dt) => {
    const { pointer } = state
    m.current.position.x = THREE.MathUtils.damp(m.current.position.x, pointer.x * strength, 5, dt)
    m.current.position.y = THREE.MathUtils.damp(m.current.position.y, pointer.y * strength, 5, dt)
  })

  type Branch = {
    x: number
    y: number
    depth: number
    color: string
  };

  let positions: Array<Branch> = [
    {x: position[0], y: position[1], depth, color: colors[0]},
    {x: position[0] - .7 , y: position[1] - .54, depth, color: colors[1]},
    {x: position[0] + .6, y: position[1] - .6, depth, color: colors[0]},
    {x: position[0] + .2, y: position[1] - 1.1, depth: depth - .3, color: colors[1]},
    {x: position[0] - .9, y: position[1] - 1.1, depth, color: colors[0]}
  ]

    return (
      <group ref={m} scale={scale}>
        {positions.map(({x, y, depth, color}) => (
        <>
            <mesh position={[x - .3, y - .2, depth]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[.25, .25, deep, 50]} />
            <meshStandardMaterial roughness={0.85} color={color} map={texture3} />
            </mesh><mesh position={[x, y, depth + .1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[.3, .3, deep, 50]} />
              <meshStandardMaterial roughness={0.85} color={color} map={texture3} />
            </mesh><mesh position={[x + .4, y - .2, depth]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[.25, .25, deep, 50]} />
              <meshStandardMaterial roughness={0.85} color={color} map={texture3} />
            </mesh><mesh position={[x + .5, y - .4, depth + .1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[.25, .25, deep, 50]} />
              <meshStandardMaterial roughness={0.85} color={color} map={texture3} />
            </mesh><mesh position={[x, y - .4, depth - .1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[.4, .4, deep, 50]} />
              <meshStandardMaterial roughness={0.85} color={color} map={texture3} />
            </mesh>
          </>
        ))}
        <mesh position={[position[0], position[1] - 1.6, depth - .1]} castShadow receiveShadow>
          <boxGeometry args={[.25, 1.5, deep]}  />
          <meshStandardMaterial roughness={0.85} color={'#5b430f'} map={texture3} />
        </mesh>
      </group>
    )
}

export default function PointerParallaxWithHelpers() {
  const globalStregth: number = 1.5;

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 40 }}
    >
      <color attach="background" args={['#348abc']} />
      <ambientLight intensity={1.0} />
      <SunWithHelpers showHelpers={false} />

      <Rig>
        <Layer depth={-2.1} strength={globalStregth * -0.5} color="#4b94f4" layerNum={0} />
        <Layer depth={-1.0} strength={globalStregth * 0.0} color="#fff352" layerNum={1} />
        <Layer depth={-1.5} strength={globalStregth * 0.5} color="#93bbf0" layerNum={10} />
        <Layer depth={-1.2} strength={globalStregth * 0.6} color="#70a9f4" layerNum={11} />
        <Layer depth={-0.9} strength={globalStregth *  0.7} color="#34a7bc" layerNum={12} />
        <Layer depth={-0.6} strength={globalStregth *  0.8} color="#348abc" layerNum={13} />
        <Layer depth={-0.1} strength={globalStregth * 1.0} color="#fff" layerNum={30} />
        <Layer depth={-0.1} strength={globalStregth * 1.0} color="#fff" layerNum={31} />
        <Layer depth={-0.1} strength={globalStregth * 1.0} color="#fff" layerNum={32} />
        <Layer depth={-0.3} strength={globalStregth * 1.9} color="#326f65" layerNum={39} />
        <Layer depth={0.2} strength={globalStregth * 2.0} color="#1e8e4f" layerNum={40} />
        <Tree depth={0.1} strength={globalStregth * 2.0} colors={["#48b14b", "#5de262"]} position={[5,2.0]} scale={1} />
        <Layer depth={0.9} strength={globalStregth * 2.5} color="#40b974" layerNum={41} />
        <Tree depth={0.8} strength={globalStregth * 2.5} colors={["#5de262", "#48b14b"]} position={[-5,1]} scale={1} />
        <Layer depth={1.2} strength={globalStregth * 3.0} color="#5de289" layerNum={42} />
        <Tree depth={0.8} strength={globalStregth * 3.0} colors={["#5de262", "#48b14b"]} position={[5.5, .9]} scale={1.5} />
        <Tree depth={0.8} strength={globalStregth * 3.0} colors={["#48b14b", "#5de262"]} position={[-6, -.3]} scale={1.5} />
        <Layer depth={1.5} strength={globalStregth *  -0.5} color="#b5f9ed" layerNum={14} />
      </Rig>
    </Canvas>
  )
}


