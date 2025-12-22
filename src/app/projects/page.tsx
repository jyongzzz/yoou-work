'use client';
import { Canvas } from '@react-three/fiber';
import GlitchImage from '@/components/GlitchImage';
import { Suspense, useState } from 'react';

// [Data] 프로젝트별 태그(tag) 추가
const projects = [
  { id: 1, title: "GEN AI 01", img: "/img1.png", tag: "Generative AI" },
  { id: 2, title: "WEBGL 02", img: "/img2.png", tag: "WebGL + Three.js" },
  { id: 3, title: "INTERACTION", img: "/img3.png", tag: "Interaction" },
];

export default function ProjectsPage() {
  // [State] 어떤 프로젝트가 호버 중인지 추적 (ID 저장)
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen p-8 md:p-20 bg-[#F9F9F8] text-[#1A1A1A]">
      <h1 className="text-6xl font-light mb-16 tracking-tighter">SELECTED PROJECTS</h1>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-col gap-4 group cursor-pointer"
            // [Event] 썸네일 박스 전체에서 호버 감지
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            
            {/* 3D Canvas Area */}
            {/* [Design] bg-black 제거 -> 항상 bg-gray-200 유지 */}
            <div className="relative h-[400px] w-full bg-gray-200 overflow-hidden transition-colors duration-300">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <Suspense fallback={null}>
                  {/* [Props] 내가 호버 중이면 true를 전달 */}
                  <GlitchImage 
                    imgSrc={project.img} 
                    isHovered={hoveredId === project.id} 
                  />
                </Suspense>
              </Canvas>
              
              {/* Overlay Text - 프로젝트별 태그 표시 */}
              <div className={`absolute top-4 right-4 text-xs font-mono bg-white text-black px-2 py-1 transition-opacity duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}>
                 {project.tag.toUpperCase()}
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