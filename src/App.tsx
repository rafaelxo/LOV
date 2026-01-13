import { useEffect, useRef, useState } from "react";

function App() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const audioRef = useRef<HTMLAudioElement>(null);

  const baseUrl = import.meta.env.BASE_URL;

  const photos = [
    {
      url: `${baseUrl}photos/foto1.JPG`,
      fallback: `${baseUrl}photos/foto1.jpg`,
    },
    {
      url: `${baseUrl}photos/foto2.JPG`,
      fallback: `${baseUrl}photos/foto2.jpg`,
    },
    {
      url: `${baseUrl}photos/foto3.JPG`,
      fallback: `${baseUrl}photos/foto3.jpg`,
    },
    {
      url: `${baseUrl}photos/foto4.JPG`,
      fallback: `${baseUrl}photos/foto4.jpg`,
    },
    {
      url: `${baseUrl}photos/foto5.JPG`,
      fallback: `${baseUrl}photos/foto5.jpg`,
    },
    {
      url: `${baseUrl}photos/foto6.JPG`,
      fallback: `${baseUrl}photos/foto6.jpg`,
    },
    {
      url: `${baseUrl}photos/foto7.JPG`,
      fallback: `${baseUrl}photos/foto7.jpg`,
    },
    {
      url: `${baseUrl}photos/foto8.JPG`,
      fallback: `${baseUrl}photos/foto8.jpg`,
    },
    {
      url: `${baseUrl}photos/foto9.JPG`,
      fallback: `${baseUrl}photos/foto9.jpg`,
    },
    {
      url: `${baseUrl}photos/foto10.JPG`,
      fallback: `${baseUrl}photos/foto10.jpg`,
    },
    {
      url: `${baseUrl}photos/foto11.JPG`,
      fallback: `${baseUrl}photos/foto11.jpg`,
    },
    {
      url: `${baseUrl}photos/foto12.JPG`,
      fallback: `${baseUrl}photos/foto12.jpg`,
    },
    {
      url: `${baseUrl}photos/foto13.JPG`,
      fallback: `${baseUrl}photos/foto13.jpg`,
    },
    {
      url: `${baseUrl}photos/foto14.JPG`,
      fallback: `${baseUrl}photos/foto14.jpg`,
    },
    {
      url: `${baseUrl}photos/foto15.JPG`,
      fallback: `${baseUrl}photos/foto15.jpg`,
    },
  ];

  const milestones = [
    {
      icon: "💋",
      title: "Primeiro Selinho",
      date: "8 de Dezembro, 2024",
      description: "O momento que mudou tudo",
      color: "from-rose-400 to-coral-400",
      bgColor: "bg-rose-50/80",
    },
    {
      icon: "💑",
      title: "Oficialmente Namorando",
      date: "7 de Março, 2025",
      description: "A data que marcou o início do nosso para sempre",
      color: "from-coral-400 to-peach-400",
      bgColor: "bg-orange-50/80",
    },
    {
      icon: "🌹",
      title: "Primeira Flor",
      date: "12 de Junho, 2025",
      description: "A primeira de muitas flores que ainda vou te dar",
      color: "from-red-400 to-rose-400",
      bgColor: "bg-red-50/80",
    },
    {
      icon: "🌙",
      title: "Conversas até tarde",
      date: "Noites sem fim",
      description: "Poderia passar horas falando com você",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-50/80",
    },
    {
      icon: "🎭",
      title: "Risadas Infinitas",
      date: "Todo dia",
      description: "Porque rir juntos é o melhor",
      color: "from-amber-400 to-yellow-400",
      bgColor: "bg-amber-50/80",
    },
    {
      icon: "🤝",
      title: "Primeiro Abraço",
      date: "Inesquecível",
      description: "Me senti em casa nos seus braços",
      color: "from-teal-400 to-cyan-400",
      bgColor: "bg-teal-50/80",
    },
    {
      icon: "📸",
      title: "Nossa Primeira Foto Juntos",
      date: "Para eternizar",
      description: "A primeira de uma coleção infinita",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50/80",
    },
    {
      icon: "💝",
      title: "Primeiro Presente",
      date: "Guardado com carinho",
      description: "Cada detalhe pensado com amor",
      color: "from-pink-400 to-fuchsia-400",
      bgColor: "bg-pink-50/80",
    },
    {
      icon: "🎵",
      title: "Nossa Música",
      date: "Lisboa - Ana Vitória",
      description: "A trilha sonora do nosso amor",
      color: "from-violet-400 to-purple-400",
      bgColor: "bg-violet-50/80",
    },
    {
      icon: "🌟",
      title: "Ela Ilumina Meus Dias",
      date: "Sempre",
      description: "Espontânea, alegre e perfeita",
      color: "from-yellow-400 to-amber-400",
      bgColor: "bg-yellow-50/80",
    },
    {
      icon: "💕",
      title: "Amor Crescente",
      date: "A cada segundo",
      description: "Me apaixonando mais e mais",
      color: "from-rose-400 to-pink-400",
      bgColor: "bg-rose-50/80",
    },
  ];

  const calculateDaysMonths = () => {
    const startDate = new Date(2025, 2, 7);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;
    return { months, days, totalDays: diffDays };
  };

  const { months, days, totalDays } = calculateDaysMonths();

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  const getPhotoUrl = (index: number) => {
    const photo = photos[index];
    return imageError[index] ? photo.fallback : photo.url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-lavender-50 to-coral-50 relative overflow-x-hidden">
      {/* Audio Player */}
      <audio ref={audioRef} loop>
        <source src={`${baseUrl}songs/lisboa.mp3`} type="audio/mpeg" />
      </audio>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-coral-300/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-1/4 right-0 w-96 h-96 bg-lavender-300/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-peach-300/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,230,220,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(230,220,255,0.3),transparent_50%)]"></div>
      </div>

      {/* Music Control Button - Mobile Friendly */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-gradient-to-br from-coral-400 to-rose-400 text-white rounded-full p-3 md:p-4 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm border-2 border-white/50"
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
      >
        {isPlaying ? (
          <svg
            className="w-6 h-6 md:w-8 md:h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4zM11 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 md:w-8 md:h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        )}
      </button>

      {/* Hero Section with Photo Slideshow */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Photo Slideshow Background with Ken Burns Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentPhotoIndex
                  ? "opacity-100 scale-105"
                  : "opacity-0 scale-100"
              }`}
            >
              <img
                src={getPhotoUrl(index)}
                alt={`Rafael e Thainá - Momento ${index + 1}`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coral-900/70 via-peach-900/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Responsive */}
        <button
          onClick={prevPhoto}
          className="absolute left-2 md:left-8 z-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-full p-2 md:p-4 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-coral-200"
          aria-label="Foto anterior"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-coral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-2 md:right-8 z-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-full p-2 md:p-4 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-coral-200"
          aria-label="Próxima foto"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-coral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Overlay Content - Responsive */}
        <div className="relative z-10 text-center px-4 mx-4 max-w-5xl">
          {/* Floating Hearts */}
          <div className="absolute -top-16 left-0 right-0 flex justify-center gap-8">
            <span className="text-3xl md:text-5xl animate-float opacity-80">
              💕
            </span>
            <span
              className="text-4xl md:text-6xl animate-float opacity-90"
              style={{ animationDelay: "1s" }}
            >
              💖
            </span>
            <span
              className="text-3xl md:text-5xl animate-float opacity-80"
              style={{ animationDelay: "2s" }}
            >
              💕
            </span>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl border-4 border-coral-200/50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-coral-200/40 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-lavender-200/40 to-transparent rounded-tl-full"></div>

            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-coral-500 via-rose-500 to-lavender-500 bg-clip-text text-transparent">
                Rafael & Thainá
              </h1>

              <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
                <div className="h-1 w-12 md:w-20 bg-gradient-to-r from-transparent via-coral-300 to-coral-400 rounded-full"></div>
                <span className="text-2xl md:text-3xl">💝</span>
                <div className="h-1 w-12 md:w-20 bg-gradient-to-l from-transparent via-lavender-300 to-lavender-400 rounded-full"></div>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-6 md:mb-8">
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="text-center bg-gradient-to-br from-coral-50 to-peach-50 rounded-2xl p-4 md:p-6 shadow-md border-2 border-coral-200">
                    <p className="text-4xl md:text-6xl font-bold text-coral-500">
                      {months}
                    </p>
                    <p className="text-coral-600 text-sm md:text-base font-semibold mt-1">
                      meses
                    </p>
                  </div>
                  <span className="text-4xl md:text-6xl">❤️</span>
                  <div className="text-center bg-gradient-to-br from-lavender-50 to-purple-50 rounded-2xl p-4 md:p-6 shadow-md border-2 border-lavender-200">
                    <p className="text-4xl md:text-6xl font-bold text-lavender-500">
                      {days}
                    </p>
                    <p className="text-lavender-600 text-sm md:text-base font-semibold mt-1">
                      dias
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-xl md:text-3xl font-semibold mb-6">
                {totalDays} dias de muito amor!
              </p>

              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                <span className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-coral-100 to-peach-100 rounded-full text-coral-700 text-sm md:text-base font-semibold border-2 border-coral-300 shadow-sm">
                  ✨ Amor Verdadeiro
                </span>
                <span className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-lavender-100 to-purple-100 rounded-full text-lavender-700 text-sm md:text-base font-semibold border-2 border-lavender-300 shadow-sm">
                  💖 Para Sempre
                </span>
                <span className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full text-rose-700 text-sm md:text-base font-semibold border-2 border-rose-300 shadow-sm">
                  🌟 Inseparáveis
                </span>
                <span className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full text-amber-700 text-sm md:text-base font-semibold border-2 border-amber-300 shadow-sm">
                  🦋 Almas Gêmeas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on Mobile */}
        <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/80 rounded-full p-3 shadow-lg border-2 border-coral-200">
            <svg
              className="w-6 h-6 text-coral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Photo Indicators - Responsive */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-md rounded-full px-3 md:px-4 py-2 md:py-3 shadow-xl border-2 border-coral-200">
        <div className="flex gap-1.5 md:gap-2 max-w-[80vw] overflow-x-auto scrollbar-hide">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`h-2 md:h-2.5 rounded-full transition-all flex-shrink-0 ${
                index === currentPhotoIndex
                  ? "w-8 md:w-10 bg-gradient-to-r from-coral-400 to-rose-400"
                  : "w-2 md:w-2.5 bg-gray-300 hover:bg-coral-300"
              }`}
              aria-label={`Ver foto ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Milestones Section - Responsive */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-2xl animate-pulse">💖</span>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">
              Nossos Momentos Marcantes
            </h2>
            <span className="text-2xl animate-pulse">💖</span>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Cada momento ao seu lado é especial e único 💕
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`group relative ${milestone.bgColor} backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-2 border-white/50`}
            >
              <div className={`h-2 bg-gradient-to-r ${milestone.color}`}></div>
              <div className="p-6 md:p-8 relative">
                <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                  {milestone.icon}
                </div>
                <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform relative z-10">
                  {milestone.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 relative z-10">
                  {milestone.title}
                </h3>
                <p className="text-coral-600 font-bold mb-3 text-sm md:text-base relative z-10">
                  📅 {milestone.date}
                </p>
                <p className="text-gray-700 text-base md:text-lg font-medium relative z-10">
                  {milestone.description}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/30 to-transparent rounded-tl-[3rem]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Responsive */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg border-t-4 border-coral-200 py-8 md:py-12 mt-16 md:mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-3 md:gap-4 text-3xl md:text-4xl mb-6">
              <span className="animate-bounce">💕</span>
              <span className="animate-bounce delay-100">💖</span>
              <span className="animate-bounce delay-200">💕</span>
            </div>

            <div className="text-center mb-6">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent mb-3">
                Feito com muito amor ❤️
              </p>
              <p className="text-gray-600 mb-4 text-sm md:text-base italic">
                "Você é a razão dos meus sorrisos e a dona do meu coração"
              </p>
              <div className="inline-block bg-gradient-to-r from-coral-50 to-lavender-50 rounded-2xl px-6 py-4 border-2 border-coral-200 shadow-md">
                <p className="text-base md:text-xl font-semibold text-gray-800">
                  Rafael Xavier Oliveira & Thainá Quetlen Dias Pimenta
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4 text-sm md:text-base text-gray-600">
              <span className="bg-coral-100 px-4 py-2 rounded-full font-medium">
                💋 8/12/2024
              </span>
              <span className="bg-lavender-100 px-4 py-2 rounded-full font-medium">
                💑 7/3/2025
              </span>
            </div>

            <p className="text-center text-sm md:text-base text-gray-500 mt-6 font-medium">
              2025 - Para sempre e além 💕✨
            </p>
          </div>
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
  );
}

export default App;
