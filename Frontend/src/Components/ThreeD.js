import React, { Suspense, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from 'drei'
import "react-colorful/dist/index.css";

function Model({props}) {
  const group = useRef()
  const { nodes, materials } = useGLTF('shoess.glb');
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [color, setColor] = useState('blue')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
          // material-color = {active ? 'black' : 'blue'}
          onClick = {(e) => setActive(!active)}
          onPointerOver = {(e) => setHovered(true)}
          onPointerOut = {(e) => setHovered(false)}
          scale = { active ? [3, 3, 3] : [3,3,3]} 
          material={materials.NikeShoe} 
          geometry={nodes.defaultMaterial.geometry} />
        </group>
      </group>
    </group>
  )
}
useGLTF.preload('shoess.glb');



 const ThreeD = (props) => {
  const [color, setColor] = useState('black');

  return(
    <div style ={{height: '100vh', border: '1px solid black', width: '50%'}}>
     <Canvas colorManagement >
       <ambientLight intensity = {.6}/>
       <Suspense fallback = {null}>
         <Model position = {[0, 1, 0]} color = {color}/>
       </Suspense>
       <OrbitControls/>

     </Canvas>
     </div>

  )
}

export default ThreeD;

