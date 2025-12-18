'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from '@/components/MagneticButton';
import { useEffect, useState } from 'react';

export default function Home() {
  // [Detail] CS 감성을 위한 실시간 시간 표시
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 애니메이션 설정 (부드러운 Blur 효과)
  const blurVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
    visible: { filter: "blur(0px)", opacity: 1, y: 0 },
  };

  return (
    <section className="h-full flex flex-col justify-between pt-20 pb-10">
      
      {/* 1. Main Headline */}
      <div className="flex flex-col gap-2 mt-10 md:mt-0">
        {/* 첫 번째 줄: INTERACTION */}
        <div className="overflow-hidden">
          <motion.h1 
            initial="hidden" animate="visible" 
            transition={{ staggerChildren: 0.1 }}
            // [Fix] 폰트 사이즈 반응형 조정 (text-5xl -> md:text-8xl)
            // [Fix] 줄바꿈(leading)과 텍스트 잘림 방지
            className="text-5xl md:text-8xl font-light tracking-tighter leading-none"
          >
            {"INTERACTION".split("").map((char, i) => (
              <motion.span key={i} variants={blurVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* 두 번째 줄: DESIGNER */}
        <div className="overflow-hidden md:pl-20">
          <motion.h1 
            initial="hidden" animate="visible" 
            transition={{ delayChildren: 0.5, staggerChildren: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-none"
          >
            {"DESIGNER".split("").map((char, i) => (
              <motion.span key={i} variants={blurVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>

      {/* 2. Introduction & CTA */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-20 md:mt-0 flex flex-col md:flex-row md:items-end justify-between gap-10"
      >
        <div className="max-w-md text-sm md:text-base text-gray-500 font-mono leading-relaxed">
          <p className="mb-4">
            {/* [Fix] /// 문자를 안전하게 문자열로 감쌌습니다 */}
            <span className="text-black font-bold">{'/// SYSTEM READY.'}</span><br/>
            Bridging the gap between engineering logic and artistic expression.
            Specialized in WebGL, Gen AI, and Micro-interactions.
          </p>
        </div>

        {/* Magnetic Button */}
        <MagneticButton>
          <Link href="/work">
            <button className="bg-black text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-blue-600 transition-colors duration-300">
              VIEW WORK {'->'}
            </button>
          </Link>
        </MagneticButton>
      </motion.div>

      {/* 3. Tech Status Footer */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="hidden md:flex justify-between items-end border-t border-gray-200 pt-8 mt-20 text-[10px] font-mono text-gray-400 uppercase"
      >
        <div>
          <span>Local Time: {time}</span>
          <span className="mx-4">|</span>
          <span>Lat: 37.5665° N</span>
        </div>
        <div>
          <span>Memory: 1024MB allocated</span>
          <span className="mx-4">|</span>
          <span className="animate-pulse text-green-500">● Online</span>
        </div>
      </motion.div>

    </section>
  );
}