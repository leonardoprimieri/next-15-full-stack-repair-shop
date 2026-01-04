import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto min-h-screen px-4">
        <div className="text-white flex flex-col gap-8 p-12 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm w-full sm:max-w-lg mx-auto shadow-2xl border border-slate-700/50">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-tight">
            Leonardo&apos;s Computer <br />
            Repair Shop
          </h1>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

          <address className="not-italic text-slate-300 text-lg leading-relaxed">
            555 Gateway Lane <br />
            Kansas City, KS 555555
          </address>

          <p className="text-blue-300 font-medium text-lg">
            Open Daily: 9am to 5pm
          </p>

          <Link
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            href="tel:5555555555"
          >
            555-555-5555
          </Link>
        </div>
      </main>
    </div>
  );
}
