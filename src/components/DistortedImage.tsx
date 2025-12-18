'use client';
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float noise = sin(pos.x * 5.0 + uTime * 2.0) * 0.1;
    pos.z += noise * uHover; 
    pos.y += noise * 0.5 * uHover;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    uv.x += sin(uv.y * 10.0) * 0.02 * uHover;
    vec4 tex = texture2D(uTexture, uv);
    vec3 color = mix(tex.rgb, vec3(1.0), uHover * 0.1);
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface Props {
  imgSrc: string;
}

export default function DistortedImage({ imgSrc }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  // 텍스처 로드
  const texture = useTexture(imgSrc);

  // [Fix] useRef 대신 useMemo를 사용하여 렌더링 중 객체 생성 방지 및 Ref 접근 에러 해결
  // WebGL에 전달할 데이터 주머니를 만듭니다.
  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
  }), [texture]); // 텍스처가 바뀔 때만 재생성

  useFrame((state, delta) => {
    if (meshRef.current) {
      // 쉐이더 매터리얼 가져오기
      const material = meshRef.current.material as THREE.ShaderMaterial;
      
      // 1. 시간 업데이트
      material.uniforms.uTime.value += delta;

      // 2. 호버 애니메이션 (Lerp)
      const targetHover = hovered ? 1 : 0;
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        targetHover,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[3, 4, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms} // [Fix] 이제 안전하게 useMemo된 객체를 전달
        transparent
      />
    </mesh>
  );
}