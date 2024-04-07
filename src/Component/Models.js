import React, {useRef, useState} from "react";
import {Html, OrbitControls, useGLTF} from '@react-three/drei';
import {useParams} from "react-router-dom";
import {Canvas} from "@react-three/fiber";
import {Color} from "three";

function Models() {
    const { name } = useParams();
    const url = `http://localhost:8000/files/${name}`;
    const gltf = useGLTF(url)
    const [menuOpen, setMenuOpen] = useState(false);
    const meshRef = useRef();

    const BLEU_PETROLE = new Color('#19476b');
    const NOIR_MINUIT = new Color('#000000');
    const GRIS_LUNE = new Color('#ffffff');
    const SABLE = new Color('#ddc692');
    const JAUNE = new Color('#f5c245');
    const ORANGE = new Color('#fa7712');
    const ROUGE = new Color('#ba2526');
    const BORDEAUX = new Color('#7c262d');
    const ROSE = new Color('#faadb2');
    const VIOLET = new Color('#896eac');
    const BLEU_VIOLET = new Color('#5273a5');
    const VERT_ANGLAIS = new Color('#17342e');
    const KAKI_CLAIR = new Color('#8ca581');
    const VERT_EAU = new Color('#bde2bb');
    const BLEU_CLAIR = new Color('#abcbd0');

    const handleMeshClick = (event) => {
        setMenuOpen(!menuOpen);
    }

    const handleColorChange = (color) => () => {
        if (meshRef.current) {
            const meshName = "Cube"; // Replace with your mesh name
            const mesh = meshRef.current.getObjectByName(meshName);
            if (mesh) {
                mesh.material.color = color;
                mesh.material.needsUpdate = true;
            } else {
                console.log(`No mesh found with name ${meshName}`);
            }
        }
    }

    return (
        <div style={{ width: "100%", height: "90vh" }}>
            <div className={'display-color'}>
                <div className="flex column gap-5">
                    {[BLEU_PETROLE, NOIR_MINUIT, GRIS_LUNE, SABLE, JAUNE, ORANGE, ROUGE, BORDEAUX, ROSE, VIOLET, BLEU_VIOLET, VERT_ANGLAIS, KAKI_CLAIR, VERT_EAU, BLEU_CLAIR].map((color, index) => (
                        <div key={index} className="pastille" style={{backgroundColor: color.getStyle()}} onClick={handleColorChange(color)}>
                        </div>
                    ))}
                </div>
            </div>
            <Canvas>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[-1, 1, 0]} intensity={0.8}/>
                <directionalLight position={[1, 1, 0]} intensity={0.8}/>
                <pointLight position={[0, 3, 0]} />
                <OrbitControls autoRotate autoRotateSpeed={1.0} minDistance={1.5} maxDistance={3}/>
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