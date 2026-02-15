import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Sense of Scale
        </h1>
        <p className="text-lg text-gray-500 mb-12">
          What is Snap&apos;s MAU? How much revenue did Allbirds make last year?
          Test your intuition about business scale. For subscribers of{" "}
          <a
            href="https://residualthoughts.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Residual Thoughts
          </a>
          .
        </p>
        <Link
          href="/play"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Play Now
        </Link>
      </div>
    </main>
  );
}
