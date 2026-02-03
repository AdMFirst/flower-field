import { useNavigate } from 'react-router';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <svg className="text-2xl" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-lg">Back to Flower Field</span>
        </button>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Flower Field
          </h1>
          <p className="text-xl text-gray-400">
            A generative cellular automaton art installation
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          {/* About Section */}
          <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-pink-400">About This Project</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Flower Field is an interactive generative art simulation inspired by cellular automata like Conway's Game of Life. 
              Watch as colorful flowers spontaneously grow and spread across an infinite field, creating ever-changing patterns 
              and beautiful visual compositions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Each flower has a unique color from a curated palette of 115 colors, ranging from vibrant hues to historical 
              flag standards and art pigments. The simulation runs entirely in your browser, with settings that persist between sessions.
            </p>
          </section>

          {/* How to Use Section */}
          <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">How to Use</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">•</span>
                <span><strong className="text-white">Click</strong> on any cell to remove a flower</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">•</span>
                <span><strong className="text-white">Settings</strong> - Click the gear icon to customize the simulation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">•</span>
                <span><strong className="text-white">Resize</strong> - The grid automatically adapts to your window size</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-400 mt-1">•</span>
                <span><strong className="text-white">Watch</strong> - Flowers spread to adjacent cells at regular intervals</span>
              </li>
            </ul>
          </section>

          {/* Features Section */}
          <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                <h3 className="text-lg font-medium mb-2 text-pink-300">Customizable Grid</h3>
                <p className="text-gray-400 text-sm">Adjust cell size, spacing, and border opacity to create your perfect field</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                <h3 className="text-lg font-medium mb-2 text-purple-300">Growth Control</h3>
                <p className="text-gray-400 text-sm">Set spread intervals and mutation probabilities for different patterns</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                <h3 className="text-lg font-medium mb-2 text-blue-300">Rich Color Palette</h3>
                <p className="text-gray-400 text-sm">115 carefully selected colors including flag standards and art pigments</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                <h3 className="text-lg font-medium mb-2 text-green-300">Persistent Settings</h3>
                <p className="text-gray-400 text-sm">Your preferences are saved automatically to localStorage</p>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Built With</h2>
            <div className="flex flex-wrap gap-3">
              {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-full text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Inspiration Section */}
          <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Inspiration</h2>
            <div className="flex items-start gap-4">
              <a
                href="https://www.youtube.com/@KatakombStudios"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-pink-400 hover:text-pink-300 transition-colors group"
              >
                <svg className="text-3xl" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <div>
                  <p className="font-medium">Katakomb Studios</p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300">Watch the original on YouTube</p>
                </div>
              </a>
            </div>
            <p className="text-gray-300 leading-relaxed mt-4">
              This project is a web-based recreation inspired by their beautiful cellular automaton game.
              I stumbled upon their YouTube short and was captivated by the simple yet mesmerizing mechanics.
              It was the perfect project to learn Zustand while creating something visually stunning.
            </p>
          </section>

          {/* Credits Section */}
          <section className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Technical Credits</h2>
            <p className="text-gray-300 leading-relaxed">
              Built with React 19, TypeScript, Vite, Tailwind CSS, and Zustand for state management.
              The flower icon is a custom SVG design. This project explores the beauty of simple rules
              creating complex emergent behavior through generative art.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>Copyright &copy; {new Date().getFullYear()} AdMFirst.</p>
          <p className="mt-1">This project is open source under the MIT License.</p>
        </footer>
      </div>
    </div>
  );
}
