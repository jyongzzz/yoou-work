export default function ContactPage() {
  return (
    <div className="min-h-screen p-8 md:p-20 pt-24 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-8">
          GET IN TOUCH
        </h1>
        <a href="mailto:your.email@example.com" className="text-2xl md:text-4xl font-bold hover:text-blue-600 transition-colors">
          hello@yoou.zip
        </a>
      </div>
      
      <div className="font-mono text-sm text-gray-400">
        <p>OPEN FOR COLLABORATION</p>
        <p>SEOUL, KOREA</p>
      </div>
    </div>
  );
}