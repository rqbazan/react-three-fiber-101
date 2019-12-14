import * as THREE from 'three'

export function rotateAroundWorldAxis(
  mesh: THREE.Mesh,
  axisVector: THREE.Vector3,
  radians: number
) {
  const quaternion = new THREE.Quaternion()

  quaternion.setFromAxisAngle(axisVector, radians)

  mesh.quaternion.multiplyQuaternions(quaternion, mesh.quaternion)
  mesh.position.sub(axisVector)
  mesh.position.applyQuaternion(quaternion)
  mesh.position.add(axisVector)
}
