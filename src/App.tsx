import { useEffect, useRef, useState } from 'react'

function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const photos = [
    '/photos/foto1.jpg',
    '/photos/foto2.jpg',
    '/photos/foto3.jpg',
    '/photos/foto4.jpg',
    '/photos/foto5.jpg',
    '/photos/foto6.jpg',
    '/photos/foto7.jpg',
    '/photos/foto8.jpg',
    '/photos/foto9.jpg',
    '/photos/foto10.jpg',
  ]

  const milestones = [
    {
      icon: '💋',
      title: 'Primeiro Selinho',
      date: '8 de Dezembro, 2024',
      description: 'O momento que mudou tudo',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: '💑',
      title: 'Oficialmente Namorando',
      date: '7 de Março, 2025',
      description: 'O pedido mais especial',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🎭',
      title: 'Risadas Infinitas',
      date: 'Todo dia',
      description: 'Porque rir juntos é o melhor',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🌟',
      title: 'Ela Ilumina Meus Dias',
      date: 'Sempre',
      description: 'Espontânea, alegre e perfeita',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: '💕',
      title: 'Amor Crescente',
      date: 'A cada segundo',
      description: 'Me apaixonando mais e mais',
      color: 'from-red-500 to-pink-500'
    }
  ]

  const calculateDaysMonths = () => {
    const startDate = new Date(2025, 2, 7)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const months = Math.floor(diffDays / 30)
    const days = diffDays % 30
    return { months, days, totalDays: diffDays }
  }

  const { months, days, totalDays } = calculateDaysMonths()

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [photos.length])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 overflow-hidden">
      {/* Audio Player */}
      <audio ref={audioRef} loop>
        <source src="/songs/lisboa.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform"
      >
        {isPlaying ? (
          <span className="text-3xl">🎵</span>
        ) : (
          <span className="text-3xl">🎶</span>
        )}
      </button>

      {/* Hero Section with Photo Slideshow */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Photo Slideshow Background */}
        <div className="absolute inset-0 overflow-hidden">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-rose-300/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-9xl mb-4">📷</p>
                  <p className="text-2xl">Foto {index + 1}</p>
                  <p className="text-sm mt-2">Coloque suas fotos em /public/photos/foto{index + 1}.jpg</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevPhoto}
          className="absolute left-8 z-10 bg-white/80 hover:bg-white rounded-full p-4 shadow-xl hover:scale-110 transition-transform"
        >
          <span className="text-3xl">←</span>
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-8 z-10 bg-white/80 hover:bg-white rounded-full p-4 shadow-xl hover:scale-110 transition-transform"
        >
          <span className="text-3xl">→</span>
        </button>

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-4 bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl max-w-2xl mx-4">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Rafael & Thaína
          </h1>
          <div className="flex justify-center items-center gap-8 mb-6">
            <div>
              <p className="text-5xl font-bold text-pink-500">{months}</p>
              <p className="text-gray-600 text-lg">meses</p>
            </div>
            <span className="text-4xl">❤️</span>
            <div>
              <p className="text-5xl font-bold text-purple-500">{days}</p>
              <p className="text-gray-600 text-lg">dias</p>
            </div>
          </div>
          <p className="text-gray-700 text-xl font-medium">
            {totalDays} dias de muito amor!
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white text-4xl">↓</div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">
          Nossos Momentos Marcantes ✨
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${milestone.color}`}></div>
              <div className="p-8">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {milestone.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-pink-500 font-semibold mb-3">
                  {milestone.date}
                </p>
                <p className="text-gray-600 text-lg">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhotoIndex(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentPhotoIndex
                ? 'w-8 bg-pink-500'
                : 'w-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 py-8">
        <div className="text-center text-white">
          <p className="text-2xl font-bold mb-2">
            Feito com muito amor ❤️
          </p>
          <p className="text-lg opacity-90">
            Rafael Xavier Oliveira & Thaína Quetlen Dias Pimenta
          </p>
          <p className="text-sm opacity-75 mt-2">
            2025 - Para sempre 💕
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
