import React, {useRef, useState} from "react";
import {Html, OrbitControls, useGLTF} from '@react-three/drei';
import {useLocation, useParams} from "react-router-dom";
import {Canvas, useFrame} from "@react-three/fiber";
import {Color, Vector3} from "three";
import { Tooltip } from 'react-tooltip'

function Models() {
    const location = useLocation();
    const model = location.state.model;
    const url = `http://localhost:8000/files/${model.file_name}`;
    const gltf = useGLTF(url)
    const [menuOpen, setMenuOpen] = useState(false);
    const primitiveRef = useRef();
    const cameraRef = useRef();

    const BLEU_PETROLE = {color: new Color('#19476b'), name: 'Bleu Pétrole'};
    const NOIR_MINUIT = {color: new Color('#000000'), name: 'Noir Minuit'};
    const GRIS_LUNE = {color: new Color('#ffffff'), name: 'Gris Lune'};
    const SABLE = {color: new Color('#ddc692'), name: 'Sable'};
    const JAUNE = {color: new Color('#f5c245'), name: 'Jaune'};
    const ORANGE = {color: new Color('#fa7712'), name: 'Orange'};
    const ROUGE = {color: new Color('#ba2526'), name: 'Rouge'};
    const BORDEAUX = {color: new Color('#7c262d'), name: 'Bordeaux'};
    const ROSE = {color: new Color('#faadb2'), name: 'Rose'};
    const VIOLET = {color: new Color('#896eac'), name: 'Violet'};
    const BLEU_VIOLET = {color: new Color('#5273a5'), name: 'Bleu Violet'};
    const VERT_ANGLAIS = {color: new Color('#17342e'), name: 'Vert Anglais'};
    const KAKI_CLAIR = {color: new Color('#8ca581'), name: 'Kaki Clair'};
    const VERT_EAU = {color: new Color('#bde2bb'), name: 'Vert Eau'};
    const BLEU_CLAIR = {color: new Color('#abcbd0'), name: 'Bleu Clair'};

    const handleMeshClick = (event) => {
        setMenuOpen(!menuOpen);
    }

    const handleColorChange = (color) => () => {
        if (primitiveRef.current) {
            const mesh = primitiveRef.current.getObjectByName(model.frame);
            if (mesh) {
                mesh.material.color.set(color);
                mesh.material.needsUpdate = true;
            } else {
                console.log(`No mesh found with name ${model.frame}`);
            }
        }
    }

    return (
        <div style={{ width: "100%", height: "90vh" }}>
            <div className={'display-color'}>
                <div className="flex column gap-5">
                    {[BLEU_PETROLE, NOIR_MINUIT, GRIS_LUNE, SABLE, JAUNE, ORANGE, ROUGE, BORDEAUX, ROSE, VIOLET, BLEU_VIOLET, VERT_ANGLAIS, KAKI_CLAIR, VERT_EAU, BLEU_CLAIR].map((color, index) => (
                            <div key={index}
                                 className="pastille"
                                 style={{backgroundColor: color.color.getStyle()}}
                                 onClick={handleColorChange(color.color)}
                                 data-tooltip-id={index}
                                 data-tooltip-content={color.name}
                                 data-tooltip-place={'right'}
                            >
                                <Tooltip id={index} ></Tooltip>
                            </div>
                    ))}
                </div>
            </div>
            <Canvas>
                <ambientLight intensity={1}/>
                <directionalLight position={[-1, 1, 0]} intensity={0.8}/>
                <directionalLight position={[1, 1, 0]} intensity={0.8}/>
                <pointLight position={[0, 3, 0]} />
                <OrbitControls ref={cameraRef} autoRotate autoRotateSpeed={1.0} minDistance={1.5} maxDistance={3} enablePan={false}/>
                <mesh scale={[0.1, 0.1, 0.1]} position={[0, 0.85, -0.7]} onClick={handleMeshClick}>
                    <circleGeometry/>
                    <meshBasicMaterial color={'red'}/>
                </mesh>
                <primitive ref={primitiveRef} object={gltf.scene} dispose={null}/>
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