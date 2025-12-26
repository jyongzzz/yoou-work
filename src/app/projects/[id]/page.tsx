'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const params = useParams();
  const { id } = params;

  // [Mock Data] 실제로는 나중에 DB나 파일에서 가져와야 함
  // 지금은 더미 데이터로 UI만 확인
  const projectData = {
    title: `PROJECT_VER.${id}`,
    description: "This project explores the relationship between generative AI and human perception. Using custom shaders and WebGL, we visualize the latent space of neural networks.",
    tags: ["WebGL", "Three.js", "Stable Diffusion"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&loop=1", // 예시 유튜브 (Rick Roll 주의)
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#1A1A1A]">
      
      {/* 1. Header & Back Button */}
      <div className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 flex justify-between items-start pointer-events-none">
        {/* pointer-events-auto로 버튼만 클릭 가능하게 */}
        <Link href="/projects" className="pointer-events-auto group">
          <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 hover:border-black transition-colors">
            <span className="font-mono text-sm">{'<-'} BACK</span>
          </div>
        </Link>
      </div>

      {/* 2. Hero Section (Video) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[60vh] md:h-[80vh] bg-black relative"
      >
        <iframe
          width="100%"
          height="100%"
          src={projectData.videoUrl}
          title="Video Player"
          className="w-full h-full object-cover opacity-80"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute bottom-10 left-6 md:left-20 text-white">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter mb-2">{projectData.title}</h1>
          <div className="flex gap-2">
            {projectData.tags.map((tag, i) => (
               <span key={i} className="text-xs font-mono border border-white/50 px-2 py-1 rounded-full">
                 {tag}
               </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Description & Gallery */}
      <div className="max-w-4xl mx-auto px-6 py-20 md:pl-64"> {/* 사이드바 고려하여 pl-64 */}
        
        {/* Text Description */}
        <div className="mb-20">
          <h2 className="text-sm font-mono text-gray-400 mb-4">{'/// DESCRIPTION'}</h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            {projectData.description}
          </p>
        </div>

        {/* Gallery Grid (Masonry 느낌) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/5] bg-gray-200 w-full relative group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-xs">IMG_01</div>
            </div>
            <div className="aspect-square bg-gray-300 w-full relative group overflow-hidden md:mt-20"> {/* 엇갈린 느낌 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-xs">IMG_02</div>
            </div>
             <div className="aspect-video bg-gray-200 w-full col-span-1 md:col-span-2 relative group overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-xs">IMG_03 (Wide)</div>
            </div>
        </div>

      </div>
    </div>
  );
}