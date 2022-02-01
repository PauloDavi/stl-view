import { useMemo } from 'react';

import { Text } from '@react-three/drei';
import { Euler, Vector3 } from 'three';

export function Axes() {
  const [x, y, z] = useMemo(() => [30, 30, 30], []);

  return (
    <>
      <arrowHelper
        args={[
          new Vector3(1, 0, 0).normalize(),
          new Vector3(0, 0, 0),
          x * 1.5,
          0xffff00,
        ]}
      />
      <Text
        scale={[x, x, x]}
        position={[x * 1.5 + 8, 0, 0]}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        X (mm)
      </Text>

      <arrowHelper
        args={[
          new Vector3(0, 1, 0).normalize(),
          new Vector3(0, 0, 0),
          y * 1.5,
          0x00ff00,
        ]}
      />

      <Text
        scale={[x, x, x]}
        position={[0, y * 1.5 + 4, 0]}
        rotation={new Euler(0, Math.PI / 4)}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Y (mm)
      </Text>
      <arrowHelper
        args={[
          new Vector3(0, 0, 1).normalize(),
          new Vector3(0, 0, 0),
          z * 1.5,
          0xff0000,
        ]}
      />
      <Text
        scale={[x, x, x]}
        position={[0, 0, z * 1.5 + 8]}
        rotation={new Euler(0, Math.PI / 2)}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Z (mm)
      </Text>

      <gridHelper position={[x / 2, 0, x / 2]} args={[x, x]} />
      <gridHelper
        position={[y / 2, y / 2, 0]}
        rotation={new Euler(Math.PI / 2)}
        args={[y, y]}
      />
      <gridHelper
        position={[0, z / 2, z / 2]}
        rotation={new Euler(0, 0, Math.PI / 2)}
        args={[z, z]}
      />
    </>
  );
}
