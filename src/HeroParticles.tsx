import { memo, useMemo } from 'react';
import { motion } from 'motion/react';

/**
 * Floating luminous particles for the Hero section.
 * Creates a warm, Mediterranean sunlight-on-water effect.
 * Uses motion/react for smooth organic animations.
 * Hidden via CSS on prefers-reduced-motion. Reduced opacity on mobile.
 */
const HeroParticles = memo(() => {
  const particles = useMemo(() => {
    // Deterministic particle positions for consistency
    const configs = [
      { x: '8%', y: '20%', size: 4, dur: 8, delay: 0, color: '#F5EFE6' },
      { x: '15%', y: '65%', size: 6, dur: 10, delay: 1.5, color: '#C9A84C' },
      { x: '25%', y: '35%', size: 3, dur: 7, delay: 0.8, color: '#F5EFE6' },
      { x: '35%', y: '75%', size: 5, dur: 9, delay: 2.2, color: '#F5EFE6' },
      { x: '45%', y: '25%', size: 4, dur: 11, delay: 0.3, color: '#C9A84C' },
      { x: '55%', y: '55%', size: 7, dur: 8, delay: 1.8, color: '#F5EFE6' },
      { x: '65%', y: '15%', size: 3, dur: 10, delay: 3.0, color: '#C9A84C' },
      { x: '72%', y: '70%', size: 5, dur: 9, delay: 0.5, color: '#F5EFE6' },
      { x: '80%', y: '40%', size: 4, dur: 12, delay: 2.0, color: '#F5EFE6' },
      { x: '88%', y: '60%', size: 6, dur: 7, delay: 1.0, color: '#C9A84C' },
      { x: '92%', y: '22%', size: 3, dur: 10, delay: 3.5, color: '#F5EFE6' },
      { x: '50%', y: '45%', size: 5, dur: 11, delay: 0.7, color: '#C9A84C' },
    ];
    return configs;
  }, []);

  return (
    <div
      data-rive
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      className="hero-particles"
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.7, 0],
            y: [0, -20, -10, -30, 0],
            x: [0, 5, -3, 8, 0],
            scale: [0.5, 1, 0.8, 1.2, 0.5],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size * 2,
            height: p.size * 2,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.color}40`,
          }}
        />
      ))}
    </div>
  );
});

HeroParticles.displayName = 'HeroParticles';

export default HeroParticles;
