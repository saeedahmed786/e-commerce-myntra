import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows, MeshWobbleMaterial, OrbitControls } from 'drei';

softShadows();



const SpinningBox = ({position, args, color}) => {
    const mesh = useRef(null);
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return(
        <mesh 
        castShadow 
        ref = {mesh} 
        position = {position} 
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(e) => setActive(!active)}
        onPointerOver = {(e) => setHover(true)}
        onPointerOut = {(e) => setHover(false)}
        >
        <boxBufferGeometry attach = 'geometry' args={args} />
        <MeshWobbleMaterial attach = 'material' color = {hovered ? 'lightblue' : color} speed = {1} factor = {.6} />
        </mesh>

    )
}


export const THREEDCOMP = (props) => {
 
    return (
        <>
        <div style = {{ height: '100vh', width: '100vw'}}>
             <Canvas 
             shadowMap
             colorManagement 
             camera = {{position: [-5, 2, 10 ], fov: 60}}
             >

            
             <ambientLight intensity = {0.3}/>
             <directionalLight  
                 castShadow
                 position = {[0, 10, 0]}
                 intensity = {1}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}

             />
              <pointLight position = {[-15, 0, -20]} intensity = {.5}/>
             <pointLight position = {[0, -10, 0]} intensity = {1.5}/>
             <group>
                 <mesh 
                 receiveShadow
                 rotation = {[-Math.PI / 2,0,0]} 
                 position = {[0,-3,0]} 
                 >

                     <planeBufferGeometry attach = 'geometry' args = {[100, 100]}/>
                     <shadowMaterial attach = 'material' color = 'gray' opacity = {1}/>
                     
                 </mesh>
                 <SpinningBox position = {[0, 1, 0]} color = 'pink' args = {[3,2,1]} />
               <SpinningBox position = {[-2, 1, -5]} color = 'gray'/>
               <SpinningBox position = {[5, 1, -2]} color = 'gray' />
             </group>
              
               <OrbitControls/>
               
             </Canvas>
           
           
            
        </div>

        </>
    )
}
