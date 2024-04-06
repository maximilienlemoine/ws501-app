import React, {useEffect, useRef, useState} from "react";
import {Html, OrbitControls, useGLTF} from '@react-three/drei';
import {useParams} from "react-router-dom";
import {Canvas, useFrame} from "@react-three/fiber";

function Models() {
    const { name } = useParams();
    const url = `http://localhost:8000/files/${name}`;
    const gltf = useGLTF(url)
    const [menuOpen, setMenuOpen] = useState(false);
    const meshRef = useRef();

    const handleMeshClick = (event) => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.traverse((node) => {
                if (node.isMesh) {
                    // Apply transformations to the mesh here
                    node.scale.set(2, 2, 2);
                }
            });
        }
    }, []);

    return (
        <div style={{ width: "100%", height: "90vh" }}>
            <Canvas>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[-3, 2, 0]} intensity={1}/>
                <directionalLight position={[3, 2, 0]} intensity={1}/>
                <OrbitControls/>
                <mesh scale={[0.1, 0.1, 0.1]} position={[0, 0.85, -0.7]} onClick={handleMeshClick}>
                    <sphereGeometry/>
                    <meshBasicMaterial color={'red'}/>
                </mesh>
                <primitive ref={meshRef} object={gltf.scene} dispose={null}/>
                {menuOpen && (
                    <Html position={[0, 1.2, -0.7]}>
                        <div className={'card'}>
                            <h2>Menu</h2>
                        </div>
                    </Html>
                )}
            </Canvas>
        </div>
    );

}

export default Models;