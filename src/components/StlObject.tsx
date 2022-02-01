import { useEffect, useMemo, useRef } from 'react';

import { useLoader, useThree } from 'react-three-fiber';
import { Box3, Mesh, Vector3 } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

interface StlObjectProps {
  url: string;
}

export function StlObject({ url }: StlObjectProps) {
  const geom = useLoader(STLLoader, url);

  const copiedScene = useMemo(() => geom.clone(), [geom]);

  const ref = useRef<Mesh>();

  const { camera } = useThree();

  useEffect(() => {
    if (ref.current) {
      const boundingBox = new Box3();

      boundingBox.setFromObject(ref.current);

      const center = boundingBox.getCenter(new Vector3(0, 0, 0));

      const size = boundingBox.getSize(new Vector3(0, 0, 0));

      ref.current.translateX(-center.x + size.x / 2);
      ref.current.translateY(-center.y + size.y / 2 - 16);
      ref.current.translateZ(-center.z + size.z / 2);

      camera.position.set(50, 20, 50);
      camera.lookAt(new Vector3(0, 0, 0));
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]} scale={new Vector3(0.1, 0.1, 0.1)}>
      <primitive object={copiedScene} attach="geometry" />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
