

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Hero Header */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">About Our Platform</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Connecting communities with seamless communication and authentic sharing.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="p-6 border rounded-xl bg-card space-y-2">
        <h2 className="text-xl font-semibold">Our Mission</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Empowering users to build meaningful connections through an intuitive, privacy-conscious social platform.
        </p>
      </section>

      {/* Core Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg text-center space-y-1">
          <h3 className="font-medium">⚡ Fast & Responsive</h3>
          <p className="text-xs text-gray-500">Real-time interactions with low latency</p>
        </div>
        <div className="p-4 border rounded-lg text-center space-y-1">
          <h3 className="font-medium">🤝 Community Driven</h3>
          <p className="text-xs text-gray-500">Built around authentic user engagements</p>
        </div>
        <div className="p-4 border rounded-lg text-center space-y-1">
          <h3 className="font-medium">🔒 Secure & Private</h3>
          <p className="text-xs text-gray-500">Privacy and safety designed into the core</p>
        </div>
      </section>
    </main>
  );
}

 