import { Text } from '@react-three/drei';
import { Euler, Vector3 } from 'three';

export function Axes() {
  return (
    <>
      <arrowHelper
        args={[
          new Vector3(1, 0, 0).normalize(),
          new Vector3(0, 0, 0),
          15,
          0xffff00,
        ]}
      />
      <Text
        scale={[10, 10, 10]}
        position={[16, 0, 0]}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        X
      </Text>
      <arrowHelper
        args={[
          new Vector3(0, 1, 0).normalize(),
          new Vector3(0, 0, 0),
          15,
          0x00ff00,
        ]}
      />

      <Text
        scale={[10, 10, 10]}
        position={[0, 16, 0]}
        rotation={new Euler(0, Math.PI / 4)}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Y
      </Text>
      <arrowHelper
        args={[
          new Vector3(0, 0, 1).normalize(),
          new Vector3(0, 0, 0),
          15,
          0xff0000,
        ]}
      />
      <Text
        scale={[10, 10, 10]}
        position={[0, 0, 16]}
        rotation={new Euler(0, Math.PI / 2)}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Z
      </Text>

      <gridHelper position={[5, 0, 5]} />
      <gridHelper position={[5, 5, 0]} rotation={new Euler(Math.PI / 2)} />
      <gridHelper
        position={[0, 5, 5]}
        rotation={new Euler(0, 0, Math.PI / 2)}
      />
    </>
  );
}
