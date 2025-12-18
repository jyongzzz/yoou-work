'use client';
import { Canvas } from '@react-three/fiber';
import DistortedImage from '@/components/DistortedImage';
import { Suspense } from 'react';

const projects = [
  { id: 1, title: "GEN AI 01", img: "/img1.png" },
  { id: 2, title: "WEBGL 02", img: "/img2.png" },
  { id: 3, title: "INTERACTION", img: "/img3.png" },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen p-8 md:p-20">
      <h1 className="text-6xl font-light mb-16 tracking-tighter">SELECTED WORK</h1>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-4 group">
            
            {/* 3D Canvas Area */}
            <div className="relative h-[400px] w-full bg-gray-200 overflow-hidden">
              {/* R3F Canvas: 여기서 WebGL이 렌더링됩니다 */}
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <Suspense fallback={null}>
                  <DistortedImage imgSrc={project.img} />
                </Suspense>
              </Canvas>
              
              {/* Overlay Text (Optional) */}
              <div className="absolute top-4 right-4 text-xs font-mono bg-white/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                WebGL
              </div>
            </div>

            {/* Project Info */}
            <div className="flex justify-between items-baseline border-b border-gray-300 pb-2 group-hover:border-black transition-colors duration-500">
              <h2 className="text-xl font-medium">{project.title}</h2>
              <span className="text-xs text-gray-400">2025</span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}