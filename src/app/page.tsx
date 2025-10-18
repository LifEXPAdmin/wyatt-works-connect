export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Wyatt Works Connect
          </h1>
          <p className="text-xl text-gray-300">Community Forum</p>
        </div>

        {/* Coming Soon */}
        <div className="mb-12">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="text-white">Coming</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Soon
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We&apos;re building something amazing. A community forum where entrepreneurs connect, 
            collaborate, and transform ideas into powerful impact.
          </p>
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Community Discussions</h3>
            <p className="text-gray-300 text-sm">Connect with fellow entrepreneurs and share insights</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Wyatt Works Method</h3>
            <p className="text-gray-300 text-sm">Access the blueprint and methodology that transforms ideas</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🤝</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Collaboration Hub</h3>
            <p className="text-gray-300 text-sm">Find partners, get feedback, and grow together</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Get Notified</h3>
            <p className="text-gray-300 mb-6">Be the first to know when we launch</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/25 whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Powered by the Wyatt Works Method</p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Home²</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Method</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">YouTube</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}