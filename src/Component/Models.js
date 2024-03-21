import React from "react";
import {OrbitControls, useGLTF} from '@react-three/drei';
import {useParams} from "react-router-dom";
import {Canvas} from "@react-three/fiber";

function Models() {
    const { name } = useParams();
    const url = `http://localhost:8081/files/${name}`;
    const gltf = useGLTF(url)
    return (
        <Canvas>
            <ambientLight/>
            <OrbitControls/>
            <primitive object={gltf.scene}/>
        </Canvas>
    );

}

export default Models;