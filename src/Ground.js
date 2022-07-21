import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";


export function Ground(){

    const [roughness]=useLoader(TextureLoader,[
        process.env.PUBLIC_URL+"texture/rough_plasterbrick_05_rough_4k.jpg"
    ]);

    useEffect(()=>{
        [roughness].forEach((t)=>{
            t.wrapS=RepeatWrapping;
            t.wrapT=RepeatWrapping;
            t.repeat.set(5,5)
        })

        roughness.encoding=LinearEncoding;

    },[roughness])

    useFrame((state,delta)=>{
        let t=-state.clock.getElapsedTime()*0.128;
        roughness.offset.set(0,t)
        
    })
    return(
    <mesh rotation-x={-Math.PI*0.5} castShadow receiveShadow>
        <planeGeometry args={[60,30]}/>
        <MeshReflectorMaterial
            envMapIntensity={0}
            roughnessMap={roughness}
            roughnessScale={[0.15,0.15]}
            dithering={true}
            color={[0.015, 0.015, 0.015]} 
            roughness={0.7}
            blur={[1000,400]}
            mixBlur={30}
            mixContrast={1}
            mixStrength={80}
            resolution={1024}
            mirror={0}
            depthScale={0.01}
            minDepthThreshold={0.9}
            maxDepthThreshold={1}
            depthToBlurRatioBias={0.25}
            debug={0}
            reflectorOffset={0.2}/>
    </mesh>)
}