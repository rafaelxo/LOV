import { useEffect, useRef, useState } from 'react'

function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [imageError, setImageError] = useState<{[key: number]: boolean}>({})
  const audioRef = useRef<HTMLAudioElement>(null)

  const photos = [
    { url: '/photos/foto1.JPG', fallback: '/photos/foto1.jpg' },
    { url: '/photos/foto2.JPG', fallback: '/photos/foto2.jpg' },
    { url: '/photos/foto3.JPG', fallback: '/photos/foto3.jpg' },
    { url: '/photos/foto4.JPG', fallback: '/photos/foto4.jpg' },
    { url: '/photos/foto5.JPG', fallback: '/photos/foto5.jpg' },
    { url: '/photos/foto6.JPG', fallback: '/photos/foto6.jpg' },
    { url: '/photos/foto7.jpg', fallback: '/photos/foto7.JPG' },
    { url: '/photos/foto8.JPG', fallback: '/photos/foto8.jpg' },
    { url: '/photos/foto9.JPG', fallback: '/photos/foto9.jpg' },
    { url: '/photos/foto10.JPG', fallback: '/photos/foto10.jpg' },
    { url: '/photos/foto11.JPG', fallback: '/photos/foto11.jpg' },
    { url: '/photos/foto12.JPG', fallback: '/photos/foto12.jpg' },
    { url: '/photos/foto13.JPG', fallback: '/photos/foto13.jpg' },
    { url: '/photos/foto14.JPG', fallback: '/photos/foto14.jpg' },
    { url: '/photos/foto15.JPG', fallback: '/photos/foto15.jpg' },
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

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }))
  }

  const getPhotoUrl = (index: number) => {
    const photo = photos[index]
    return imageError[index] ? photo.fallback : photo.url
  }

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Audio Player */}
      <audio ref={audioRef} loop>
        <source src="/songs/lisboa.mp3" type="audio/mpeg" />
      </audio>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-pink-500/20 animate-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.1),transparent_50%)]"></div>
      </div>

      {/* Music Control Button - Mobile Friendly */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full p-3 md:p-4 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm border-2 border-white/20"
        aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4zM11 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
          </svg>
        )}
      </button>

      {/* Hero Section with Photo Slideshow */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Photo Slideshow Background with Ken Burns Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentPhotoIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            >
              <img
                src={getPhotoUrl(index)}
                alt={`Rafael e Thaína - Momento ${index + 1}`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Responsive */}
        <button
          onClick={prevPhoto}
          className="absolute left-2 md:left-8 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 md:p-4 shadow-xl hover:scale-110 active:scale-95 transition-all border border-white/30"
          aria-label="Foto anterior"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-2 md:right-8 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2 md:p-4 shadow-xl hover:scale-110 active:scale-95 transition-all border border-white/30"
          aria-label="Próxima foto"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Overlay Content - Responsive */}
        <div className="relative z-10 text-center px-4 mx-4 max-w-4xl">
          {/* Hearts Animation */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl animate-bounce">
            💕
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-white/20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
              Rafael & Thaína
            </h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-4 md:mb-6">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-center">
                  <p className="text-4xl md:text-6xl font-bold text-pink-400 drop-shadow-lg">{months}</p>
                  <p className="text-white/80 text-sm md:text-lg font-medium">meses</p>
                </div>
                <span className="text-3xl md:text-5xl animate-pulse">❤️</span>
                <div className="text-center">
                  <p className="text-4xl md:text-6xl font-bold text-purple-400 drop-shadow-lg">{days}</p>
                  <p className="text-white/80 text-sm md:text-lg font-medium">dias</p>
                </div>
              </div>
            </div>

            <p className="text-white text-lg md:text-2xl font-medium drop-shadow-lg">
              {totalDays} dias de muito amor!
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2">
              <span className="px-3 md:px-4 py-1 md:py-2 bg-pink-500/30 backdrop-blur-sm rounded-full text-white text-xs md:text-sm border border-pink-400/30">
                Amor Verdadeiro
              </span>
              <span className="px-3 md:px-4 py-1 md:py-2 bg-purple-500/30 backdrop-blur-sm rounded-full text-white text-xs md:text-sm border border-purple-400/30">
                Para Sempre
              </span>
              <span className="px-3 md:px-4 py-1 md:py-2 bg-rose-500/30 backdrop-blur-sm rounded-full text-white text-xs md:text-sm border border-rose-400/30">
                Inseparáveis
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on Mobile */}
        <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Photo Indicators - Responsive */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-1.5 md:gap-2 max-w-[90vw] overflow-x-auto px-4 pb-2 scrollbar-hide">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhotoIndex(index)}
            className={`h-2 md:h-3 rounded-full transition-all flex-shrink-0 ${
              index === currentPhotoIndex
                ? 'w-6 md:w-8 bg-pink-500'
                : 'w-2 md:w-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ver foto ${index + 1}`}
          />
        ))}
      </div>

      {/* Milestones Section - Responsive */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
            Nossos Momentos Marcantes
          </h2>
          <div className="flex justify-center gap-2 text-3xl md:text-4xl">
            <span className="animate-pulse">✨</span>
            <span className="animate-pulse delay-100">💖</span>
            <span className="animate-pulse delay-200">✨</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              <div className={`h-1.5 md:h-2 bg-gradient-to-r ${milestone.color}`}></div>
              <div className="p-6 md:p-8">
                <div className="text-5xl md:text-6xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  {milestone.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-pink-400 font-semibold mb-2 md:mb-3 text-sm md:text-base">
                  {milestone.date}
                </p>
                <p className="text-white/80 text-base md:text-lg">
                  {milestone.description}
                </p>
              </div>
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Responsive */}
      <div className="relative z-10 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 py-6 md:py-8 mt-12 md:mt-20">
        <div className="text-center text-white px-4">
          <div className="flex justify-center gap-2 md:gap-3 text-2xl md:text-3xl mb-3 md:mb-4">
            <span className="animate-bounce">💕</span>
            <span className="animate-bounce delay-100">❤️</span>
            <span className="animate-bounce delay-200">💕</span>
          </div>
          <p className="text-xl md:text-2xl font-bold mb-2">
            Feito com muito amor
          </p>
          <p className="text-sm md:text-lg opacity-90 max-w-md mx-auto">
            Rafael Xavier Oliveira & Thaína Quetlen Dias Pimenta
          </p>
          <p className="text-xs md:text-sm opacity-75 mt-2">
            2025 - Para sempre 💕
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes gradient {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-gradient {
          animation: gradient 20s ease infinite;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default App
