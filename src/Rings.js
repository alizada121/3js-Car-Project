import { useFrame } from '@react-three/fiber'
import {useRef} from 'react'
import { Color } from 'three';

export function Rings(){
    const itemsRef=useRef([])

   

    useFrame((state)=>{
        let elapsed=state.clock.getElapsedTime();
        for (let i=0; i<itemsRef.current.length; i++){
            let mesh=itemsRef.current[i];
            let z=(i-7)*3.5 +((elapsed*0.4)%3.5)*2;
            mesh.position.set(0,0,-z)

            let dist=Math.abs (z);
            mesh.scale.set(1-dist*0.04,1-dist*0.04,1-dist*0.04)

          
           
            if(i%2==0){
                mesh.material.emissive=new Color(6,0.15,0.7).multiplyScalar(0.5)
            }else{
                mesh.material.emissive=new Color(0.1,0.7,3).multiplyScalar(0.5)

            }
        }
    })
    return(
    <>
    {[0,0,0,0,0,0,0,0,0,0,0].map((v,i)=>(
        <mesh
            castShadow
            receiveShadow
            reflectorOffset={0.2}
            position={[0,0,0]}
            key={i}
            ref={(el)=>(itemsRef.current[i]=el)}

        >
            <torusGeometry args={[3.35,0.05,16,100]}/>
            <meshLambertMaterial emissive={[0.5,0.5,0.5]} color={[0,0,0]}/>
        </mesh>
    ))}
    </>)
}