import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // [Headers]
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-4 tracking-tight border-b border-gray-100 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-3 tracking-tight text-gray-900">{children}</h3>,
    
    // [Body]
    p: ({ children }) => <p className="text-lg leading-relaxed mb-6 text-gray-700 font-light">{children}</p>,
    
    // [List] ★ 여기가 바뀌어야 합니다! ★
    // 기존의 list-disc 클래스는 지워버리고, 스타일 없는 ul을 만듭니다.
    ul: ({ children }) => <ul className="mb-8 ml-2 space-y-2">{children}</ul>,
    
    // [List Item] ★ 여기가 핵심입니다! ★
    // li 태그 안에서 '검은색 div'를 직접 그려서 점으로 씁니다.
    li: ({ children }) => (
      <li className="flex items-start gap-3 text-gray-700">
        <div className="mt-[0.6rem] w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 opacity-80" />
        <span className="flex-1 leading-relaxed">{children}</span>
      </li>
    ),

    // [Quote]
    blockquote: ({ children }) => <blockquote className="border-l-4 border-black pl-4 italic text-gray-500 my-8 bg-gray-50 p-4 rounded-r">{children}</blockquote>,
    
    // [Image]
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        className="w-full h-auto rounded-lg my-8 border border-gray-100 shadow-sm" 
        alt={props.alt || "Blog Image"}
      />
    ),
    
    ...components,
  }
}