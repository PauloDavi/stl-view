import { Suspense } from 'react';

import { Stats, OrbitControls, Text } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import { Euler } from 'three';

import { Axes } from '../components/Axes';
import { StlObject } from '../components/StlObject';
import { UseDrop } from '../contexts/DropContext';

export function Home() {
  const { fileUrl, isValidFormat, isDragging } = UseDrop();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Canvas
        camera={{
          near: 0.1,
          position: [50, 0, 50],
          zoom: 25,
        }}
        orthographic
        onCreated={({ gl }) => {
          gl.setClearColor('#252934');
        }}
      >
        <Stats />
        <OrbitControls />
        <ambientLight intensity={0.8} />
        <spotLight intensity={0.7} position={[300, 300, 400]} />

        {fileUrl ? (
          <Suspense fallback={null}>
            <Axes />

            <StlObject url={fileUrl} />
          </Suspense>
        ) : (
          <Text
            scale={[10, 10, 10]}
            rotation={new Euler(0, Math.PI / 4, 0)}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {isDragging && isValidFormat
              ? 'Formato de arquivo invalido'
              : 'Arraste e solte um arquivo .stl para visualizar'}
          </Text>
        )}
      </Canvas>
    </div>
  );
}
