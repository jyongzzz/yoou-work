'use client';
import { Canvas } from '@react-three/fiber';
import GlitchImage from '@/components/GlitchImage';
import { Suspense, useState } from 'react';
import Link from 'next/link';

const generateProjects = () => {
  const baseProjects = [
    { title: "GEN AI 01", img: "/img1.png", tag: "Gen AI" },
    { title: "WEBGL 02", img: "/img2.png", tag: "WebGL + Three.js" },
    { title: "INTERACTION", img: "/img3.png", tag: "Interaction + Motion" },
  ];

  return Array.from({ length: 20 }).map((_, i) => {
    const base = baseProjects[i % 3];
    return {
      id: i + 1,
      title: `${base.title}_VER.${i + 1}`,
      img: base.img,
      tag: base.tag,
    };
  });
};

const projects = generateProjects();

export default function ProjectsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen p-8 md:p-20 bg-[#F9F9F8] text-[#1A1A1A]">
      <h1 className="text-6xl font-light mb-16 tracking-tighter">SELECTED PROJECTS</h1>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div 
              className="flex flex-col gap-4 group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              
              {/* 3D Canvas Area */}
              <div className="relative h-[400px] w-full bg-gray-200 overflow-hidden transition-colors duration-300">
                
                {/* [Optimization] 1. 평소에는 정적 이미지(JPG/PNG)를 보여줍니다. 리소스 0 소모. */}
                <img 
                    src={project.img} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* [Optimization] 2. 오직 마우스를 올렸을 때만 WebGL 엔진을 켭니다. */}
                {hoveredId === project.id && (
                  <div className="absolute inset-0 z-10">
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <Suspense fallback={null}>
                        <GlitchImage 
                            imgSrc={project.img} 
                            isHovered={true} // 항상 true (조건부 렌더링이므로)
                        />
                        </Suspense>
                    </Canvas>
                  </div>
                )}
                
                {/* Overlay Text */}
                <div 
                  className={`absolute top-4 right-4 text-xs font-mono bg-white text-black px-2 py-1 transition-opacity duration-300 z-20 ${
                    hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {`${project.tag.toUpperCase()}`}
                </div>
              </div>

              {/* Project Info */}
              <div className="flex justify-between items-baseline border-b border-gray-300 pb-2 group-hover:border-black transition-colors duration-500">
                <h2 className="text-xl font-medium">{project.title}</h2>
                <span className="text-xs text-gray-400">2025</span>
              </div>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}