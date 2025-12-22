export default function AboutPage() {
  return (
    <div className="min-h-screen p-8 md:p-20 pt-24 flex flex-col justify-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
        WHO AM I?
      </h1>
      <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl text-gray-800">
        I am an <span className="font-bold underline decoration-blue-500">Interaction Designer</span> based in Seoul.
        <br /><br />
        My background in Computer Science allows me to bridge the gap between 
        visual aesthetics and engineering logic.
      </p>
    </div>
  );
}