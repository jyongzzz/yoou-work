export default function PlaygroundPage() {
  return (
    <div className="min-h-screen p-8 md:p-20 pt-24">
      <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-8">
        PLAYGROUND
      </h1>
      <p className="text-gray-500 font-mono text-sm border-l-2 border-black pl-4">
        {/* [Fix] 특수문자 /// 를 문자열로 감쌌습니다 */}
        {'/// EXPERIMENTAL_LAB'} <br />
        This area is restricted for Gen AI & Motion tests. <br />
        Loading assets...
      </p>
    </div>
  );
}