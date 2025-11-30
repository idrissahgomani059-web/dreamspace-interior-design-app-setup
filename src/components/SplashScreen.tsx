
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Play welcome audio
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==';
    
    // Simulate voice greeting (in production, use actual audio file)
    const utterance = new SpeechSynthesisUtterance('Welcome to Idrees Building Architecture');
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.log('Speech synthesis not available');
      }
    }, 500);

    // Animation sequence
    setTimeout(() => setShowLogo(true), 1000);
    setTimeout(() => setShowText(true), 2000);
    setTimeout(() => onComplete(), 5000);
  }, [onComplete]);

  // Generate particle positions
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3,
    size: 2 + Math.random() * 4,
    isGold: Math.random() > 0.5,
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
      >
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute rounded-full ${
                particle.isGold ? 'bg-[hsl(var(--gold))]' : 'bg-[hsl(var(--silver))]'
              }`}
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                boxShadow: particle.isGold
                  ? '0 0 10px hsla(45, 100%, 51%, 0.8)'
                  : '0 0 10px hsla(210, 11%, 71%, 0.6)',
              }}
              animate={{
                y: [1000, -1000],
                x: [0, (Math.random() - 0.5) * 200],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0.5],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          {/* Logo */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  {/* IBA Logo */}
                  <div className="text-8xl font-bold text-gradient-gold mb-4 tracking-wider">
                    I.B.A
                  </div>
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Content */}
          <AnimatePresence>
            {showText && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold text-white mb-2">
                  Idrees Building Architecture
                </h1>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6"
                >
                  <h2 className="text-5xl font-bold text-gradient-premium mb-3">
                    DreamSpace
                  </h2>
                  <p className="text-xl text-silver-light">
                    Design, Visualize, and Bring Your Space to Life
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-12"
          >
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-gold"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};