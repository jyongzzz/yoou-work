import Link from 'next/link';

export default function ThoughtsPage() {
  // [Log Data] 여기에 당신의 생각들을 하나씩 기록하게 됩니다.
  const posts = [
    {
      slug: 'hello-world',
      title: 'Design as Code, Code as Design',
      date: '2025. 12. 25',
      desc: 'Why I decided to bridge the gap between engineering logic and artistic expression.',
      tags: ['Essay', 'Intro']
    },
  ];

  return (
    <div className="min-h-screen p-8 md:p-20 pt-24 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-16">
        THOUGHTS
      </h1>

      <div className="flex flex-col gap-12">
        {posts.map((post) => (
          <Link key={post.slug} href={`/thoughts/${post.slug}`} className="group block">
            <article className="border-b border-gray-100 pb-8 hover:border-black transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                <h2 className="text-2xl font-medium group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <span className="font-mono text-xs text-gray-400 mt-1 md:mt-0">
                  {post.date}
                </span>
              </div>
              <p className="text-gray-500 font-light leading-relaxed mb-4 line-clamp-2">
                {post.desc}
              </p>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono bg-gray-50 px-2 py-1 rounded text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        {tag}
                    </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}