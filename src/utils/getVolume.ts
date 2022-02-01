import { BufferGeometry, Vector3 } from 'three';

export function getVolume(geometry: BufferGeometry) {
  function signedVolumeOfTriangle(p1: Vector3, p2: Vector3, p3: Vector3) {
    return p1.dot(p2.cross(p3)) / 6.0;
  }

  const position = geometry.attributes.position;
  const faces = position.count / 3;
  let sum = 0;

  const p1 = new Vector3();
  const p2 = new Vector3();
  const p3 = new Vector3();

  for (let i = 0; i < faces; i++) {
    p1.fromBufferAttribute(position, i * 3 + 0);
    p2.fromBufferAttribute(position, i * 3 + 1);
    p3.fromBufferAttribute(position, i * 3 + 2);
    sum += signedVolumeOfTriangle(p1, p2, p3);
  }
  return sum;
}
