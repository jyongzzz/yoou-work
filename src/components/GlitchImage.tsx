'use client';
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// [Tuning] 쉐이더 파라미터를 소극적으로 조절
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
    
    // [Glitch 1] 가로 찢어짐 (Slice)
    // 강도: 0.1 -> 0.02 (5배 약하게)
    float slice = random(vec2(0.0, uv.y * 10.0 + uTime)) * 0.1 * uHover;
    
    // 빈도: 0.95 -> 0.98 (더 드물게 발생)
    if (random(vec2(uTime, uv.y)) > 0.98) {
        uv.x += slice;
    }

    // [Glitch 2] RGB 채널 분리 (Chromatic Aberration)
    // 강도: 0.05 -> 0.015 (약 3배 약하게)
    float shift = 0.02 * uHover * sin(uTime * 10.0);
    
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;

    // [Glitch 3] 자글자글한 노이즈
    // 강도: 0.1 -> 0.03 (3배 이상 약하게)
    float noise = random(uv * uTime) * 0.1 * uHover;
    
    gl_FragColor = vec4(r + noise, g + noise, b + noise, 1.0);
  }
`;

interface Props {
  imgSrc: string;
  isHovered: boolean;
}

export default function GlitchImage({ imgSrc, isHovered }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imgSrc);
  const { viewport } = useThree();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const img = texture.image as any; 
  
  const imgWidth = img?.width || 1;
  const imgHeight = img?.height || 1;

  const viewportAspect = viewport.width / viewport.height;
  const imageAspect = imgWidth / imgHeight;

  let scaleW, scaleH;
  if (viewportAspect > imageAspect) {
    scaleW = viewport.width;
    scaleH = viewport.width / imageAspect;
  } else {
    scaleH = viewport.height;
    scaleW = viewport.height * imageAspect;
  }

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
  }), [texture]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += delta;
      
      const targetHover = isHovered ? 1 : 0;
      // 반응 속도도 약간 더 부드럽게 (0.2 -> 0.15)
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        targetHover,
        0.15
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={[scaleW, scaleH, 1]}
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