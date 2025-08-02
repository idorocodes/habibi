import React, { useState, useEffect } from "react";
import {
  Heart,
  Play,
  Pause,
  Sparkles,
  Star,
  Gift,
 
  Volume2,
  VolumeX,
} from "lucide-react";

const girlfriendVideos = ["/vid0.mp4", "/vid1.mp4", "/vid2.mp4"];

const loveQuotes = [
  "You are my today and all of my tomorrows",
  "In all the world, there is no heart for me like yours",
  "You're the best thing I never planned",
  "Every love story is beautiful, but ours is my favorite",
  "I love you not only for what you are, but for what I am when I am with you",
];

const FloatingHeart = ({ delay = 0 }) => (
  <div
    className="absolute text-pink-400 opacity-30 animate-pulse"
    style={{
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: "3s",
    }}
  >
    <Heart className="w-4 h-4 fill-current" />
  </div>
);

const VideoCard = ({ src, index, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoElement, setVideoElement] = useState(null);

  const togglePlay = () => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        setIsPlaying(false);
      } else {
        videoElement.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="group relative">
      <div className="relative overflow-hidden font-body rounded-2xl bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-all duration-500">
        <video
          ref={setVideoElement}
          src={src}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button
            onClick={togglePlay}
            className="bg-pink-500 hover:bg-pink-600 rounded-full p-4 transform hover:scale-110 transition-all duration-300 shadow-2xl"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </div>

        {/* Title */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
          <p className="text-pink-300 text-sm">{description}</p>
        </div>
      </div>

      {/* Card Number */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-2xl">
        {index + 1}
      </div>
    </div>
  );
};

export default function App() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [hearts, setHearts] = useState([]);
  const [mainVideoPlaying, setMainVideoPlaying] = useState(false);
  const [mainVideoElement, setMainVideoElement] = useState(null);

  useEffect(() => {
    // Create floating hearts
    const heartArray = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
    }));
    setHearts(heartArray);
  }, []);

const toggleMainVideo = () => {
    if (mainVideoElement) {
      if (mainVideoPlaying) {
        mainVideoElement.pause();
        setMainVideoPlaying(false);
      } else {
        mainVideoElement.play();
        setMainVideoPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen font-body bg-black text-white relative overflow-x-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted={isVideoMuted}
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-pink-and-blue-ink-1192-large.mp4"
            type="video/mp4"
          />
          {/* Fallback gradient */}
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-red-900"></div>
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/60 to-red-900/80"></div>
      </div>

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {hearts.map((heart) => (
          <FloatingHeart key={heart.id} delay={heart.delay} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-pink-500 fill-current" />
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
            FOR HABIBI
          </span>
        </div>

        <div className="hidden md:flex space-x-8 text-gray-300">
          <a
            href="#about"
            className="hover:text-pink-400 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#memories"
            className="hover:text-pink-400 transition-colors duration-300 border-b-2 border-pink-500"
          >
            Memories
          </a>
         
          <a
            href="#contact"
            className="hover:text-pink-400 transition-colors duration-300"
          >
            Message
          </a>
        </div>

        <button
          onClick={() => setIsVideoMuted(!isVideoMuted)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        >
          {isVideoMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-pink-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-wider">
                    Special Day
                  </span>
                </div>

                <h1 className="text-5xl md:text-8xl font-header leading-none">
                  <span className="bg-gradient-to-r from-pink-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
                    HAPPY
                  </span>
                  <br />
                  <span className="text-white">GIRLFRIEND'S</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                    DAY
                  </span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                A romantic journey celebrating the most beautiful soul in the
                universe.
                <br />
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    setCurrentQuote(
                      loveQuotes[Math.floor(Math.random() * loveQuotes.length)]
                    )
                  }
                  className="flex items-center justify-center space-x-3 border-2 border-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-500/10 transition-all duration-300"
                >
                  <Heart className="w-6 h-6" />
                  <span>Love Message</span>
                </button>
              </div>

              {currentQuote && (
                <div className="bg-white/5 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6 mt-6 animate-fade-in">
                  <div className="text-4xl text-pink-400 mb-2">"</div>
                  <p className="text-lg italic text-gray-200">{currentQuote}</p>
                  <div className="text-4xl text-pink-400 text-right rotate-180 mt-2">
                    "
                  </div>
                </div>
              )}
            </div>

            {/* Right Content - Main Video */}
            <div className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Main Video Container */}
                <div className="relative w-80 h-90 max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                  <video
                    ref={setMainVideoElement}
                    src={girlfriendVideos[0]}
                    className="w-80 h-full object-cover"
                    muted
                    loop
                    playsInline
                    onPlay={() => setMainVideoPlaying(true)}
                    onPause={() => setMainVideoPlaying(false)}
                  />

                  {/* Video Overlay & Play Button */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={toggleMainVideo}
                      className="bg-pink-500/80 hover:bg-pink-600 rounded-full p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl"
                    >
                      {mainVideoPlaying ? (
                        <Pause className="w-12 h-12 text-white" />
                      ) : (
                        <Play className="w-12 h-12 text-white ml-1" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-pink-400">
                <div className="text-center">
                  <div className="text-sm mb-2 rotate-90 origin-center">
                    SCROLL
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-pink-500 to-transparent mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Memory Cards Section */}
        <section  className="py-20 px-6 md:px-12" id="memories">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-pink-400 font-header to-purple-400 bg-clip-text text-transparent">
                  MY FAVORITE
                </span>
                <br />
                <span className="text-white font-header">MEDIAS</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Every video is a remembrace of your beauty, elegance and ever
                loving attitude..
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {girlfriendVideos.map((video, index) => (
                <VideoCard
                  key={index}
                  src={video}
                  index={index}
                  title={
                    index === 0
                      ? "Magical"
                      : index === 1
                      ? "Shining even in the dark "
                      : "Perfect Moments"
                  }
                  description={
                    index === 0
                      ? "The ever addictive video"
                      : index === 1
                      ? "Full of suprises "
                      : "Consistent beauty."
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Love Letter Section */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 to-purple-900/10"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <Gift className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h2 className="text-3xl md:text-4xl font-header text-white mb-4">
                    A Letter From My Heart
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto"></div>
                </div>

                <div className="text-lg md:text-xl leading-relaxed space-y-6 text-gray-200">
                  <p className="italic text-pink-300">My dearest habibi,</p>

                  <p>
                    Hmm, Lemme start like this. Lately, some girl messaged me
                    and asked why I’ve not been online and replying messages and
                    stuffs. I didn’t expect it cause I have been all by myself
                    and, you know, alone. </p> <p> The message shocked me at first, but I
                    had to reply. Why? Let’s say because she's too beautiful to
                    be ignored. Actually, she's been the only one that talks to
                    me if I'm not talking to my computer. She's been wonderful ,
                    exciting , and sending her medias whenever I asked for it. I
                    still appreciate God for a being like her. </p> <p> She makes days
                    feel like hours and hours like minutes. She's more than
                    special , honestly. I don’t think Oxford Dictionary has an
                    adjective for her, lol. Her beauty is compelling , carries
                    this divine atmosphere. If I'm not careful, I can spend
                    hours watching her videos . </p> <p> No, I’m not crazy, I’m just
                    surprised at the kind of person she is. Her actions match
                    her appearance entirely beautifu l. I don’t celebrate her
                    occasionally , because I don’t remember her occasionally. I
                    remember this girl every millisecond . Yeah, that's how
                    important she is. </p> <p> I don’t know if I should say this or I
                    shouldn't...nahh, I feel it’s too early to say it. Orr
                    should I? Noo jare... lemme save it. Can’t predict her
                    response. </p> <p> I’ve been describing this damsel without
                    mentioning her name. I think her name is Christiana . I call
                    her Habibi tho (it has an Arabic meaning), ’cause that’s
                    exactly what she is to me. <br /> <br />  <b>Happy Girlfriend’s Day , Habibi
                    💐💕. <br /> I love you ❤️. </b>
                  </p>

                  <p className="text-right italic font-semibold text-pink-300">
                   Sending Hugs,
                    <br />
                    <span className="text-red-400">Him 💕</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom gradient text animation */
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
