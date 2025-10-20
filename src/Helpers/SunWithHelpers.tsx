import * as THREE from 'three'
import React, { useRef } from 'react'
import { useHelper } from '@react-three/drei'

export default function SunWithHelpers({
      showHelpers = true,
}: {
  showHelpers?: boolean
}) {
  const light = useRef<THREE.DirectionalLight>(null!)

  // 1) Visualize the light direction
  useHelper(showHelpers ? light : null, THREE.DirectionalLightHelper, 2)

  // 2) Visualize the shadow camera frustum (CameraHelper)
  // `useHelper` also works with the shadow camera:
  useHelper(
    showHelpers && light.current ? (light.current.shadow.camera as unknown as React.MutableRefObject<THREE.Camera>) : null,
    THREE.CameraHelper
  )

  return (
    <>
    <directionalLight
      ref={light}
      position={[-1, 1, 7]}
      intensity={0.9}
      castShadow
      // Shadow quality & frustum
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-near={1}
      shadow-camera-far={25}
      shadow-camera-left={-20}
      shadow-camera-right={20}
      shadow-camera-top={20}
      shadow-camera-bottom={-20}
    />
    </>
  )
}