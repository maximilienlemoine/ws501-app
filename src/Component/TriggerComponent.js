import React, {useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";

function TriggerComponent({handleMeshClick, position}) {
    const mesh = useRef();
    const { camera } = useThree();

    useFrame(() => {
        mesh.current.lookAt(camera.position);
    });
  return (
      <mesh scale={[0.1, 0.1, 0.1]} position={position} onClick={handleMeshClick} ref={mesh}>
          <circleGeometry/>
      </mesh>
  );
}

export default TriggerComponent;