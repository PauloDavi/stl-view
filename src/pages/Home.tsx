import { Suspense } from 'react';

import { OrbitControls, Line, Text } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import { Euler } from 'three';

import { Axes } from '../components/Axes';
import { ClearButton } from '../components/ClearButton';
import { StlObject } from '../components/StlObject';
import { TableStlProps } from '../components/TableStlProps';
import { Title } from '../components/Title';
import { UseDrop } from '../contexts/DropContext';

export function Home() {
  const { fileUrl, isValidFormat, isDragging, handleClick } = UseDrop();

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
      <Title />

      <TableStlProps />

      <ClearButton />

      <Canvas
        camera={{
          near: 0.1,
          position: [50, 0, 50],
          zoom: 6,
        }}
        orthographic
        onCreated={({ gl }) => {
          gl.setClearColor('#252934');
        }}
      >
        <OrbitControls />
        <ambientLight intensity={0.8} />
        <spotLight intensity={0.7} position={[300, 300, 400]} />

        {fileUrl ? (
          <group position={[0, -16, 0]}>
            <Suspense fallback={null}>
              <Axes />
              <StlObject url={fileUrl} />
            </Suspense>
          </group>
        ) : (
          <>
            <Text
              scale={[40, 40, 40]}
              rotation={new Euler(0, Math.PI / 4, 0)}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {isDragging && !isValidFormat
                ? 'Formato de arquivo inválido'
                : 'Arraste e solte um arquivo .stl para visualizar'}
            </Text>
            {!isDragging && (
              <group
                scale={[40, 40, 40]}
                position={[0, -6, 0]}
                rotation={new Euler(0, Math.PI / 4, 0)}
                onClick={handleClick}
              >
                <Line
                  points={[
                    [-0.3, 0.06, -0.001],
                    [0.3, 0.06, -0.001],
                    [0.3, -0.06, -0.001],
                    [-0.3, -0.06, -0.001],
                    [-0.3, 0.06, -0.001],
                  ]}
                  color="withe"
                  lineWidth={2}
                  dashed={false}
                />
                <Text color="white" anchorX="center" anchorY="middle">
                  Ou click aqui
                </Text>
              </group>
            )}
          </>
        )}
      </Canvas>
    </div>
  );
}
