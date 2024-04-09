import React, {useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {MeshStandardMaterial, TextureLoader} from "three";
import textureHint from "../asset/loupe.svg";

function TriggerComponent({handleMeshClick, position, context}) {
    const mesh = useRef();
    const { camera } = useThree();

    const openMenu = () => {
        handleMeshClick(context, position);
    }

    const textureLoader = new TextureLoader();
    textureLoader.load(textureHint, (texture) => {
        mesh.current.material = new MeshStandardMaterial({map: texture});
    });

    useFrame(() => {
        mesh.current.lookAt(camera.position);
    });
  return (
      <mesh scale={[0.1, 0.1, 0.1]} position={position} onClick={openMenu} ref={mesh}>
          <circleGeometry/>
      </mesh>
  );
}

export default TriggerComponent;