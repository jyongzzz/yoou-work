'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover; 
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float slice = random(vec2(0.0, uv.y * 10.0 + uTime)) * 0.1 * uHover;
    if (random(vec2(uTime, uv.y)) > 0.95) {
        uv.x += slice;
    }
    float shift = 0.05 * uHover * sin(uTime * 10.0);
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    float noise = random(uv * uTime) * 0.1 * uHover;
    gl_FragColor = vec4(r + noise, g + noise, b + noise, 1.0);
  }
`;

interface Props {
  imgSrc: string;
  isHovered: boolean; // [Change] 부모로부터 호버 상태를 전달받음
}

export default function GlitchImage({ imgSrc, isHovered }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imgSrc);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
  }), [texture]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += delta;
      
      // 전달받은 isHovered 값에 따라 반응
      const targetHover = isHovered ? 1 : 0;
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        targetHover,
        0.2
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      // [Removed] 여기서 직접 이벤트를 받지 않습니다.
      scale={[3, 4, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}