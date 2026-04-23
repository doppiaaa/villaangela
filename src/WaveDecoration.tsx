import { memo } from 'react';
import { motion } from 'motion/react';

interface WaveDecorationProps {
  variant: 'separator' | 'footer';
  className?: string;
}

/**
 * Animated SVG wave decoration.
 * - 'separator': elegant ornamental wave between unit cards
 * - 'footer': subtle sand/wave texture for the footer
 * Uses motion/react for smooth path animation. Hidden on prefers-reduced-motion.
 */
const WaveDecoration = memo(({ variant, className = '' }: WaveDecorationProps) => {
  if (variant === 'separator') {
    return (
      <div
        data-rive
        className={`wave-decoration ${className}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
          margin: '40px auto',
        }}
      >
        <svg
          viewBox="0 0 500 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: '800px', height: '100px' }}
        >
          {/* Central ornament dot */}
          <motion.circle
            cx="250"
            cy="50"
            r="5"
            fill="#C9A84C"
            animate={{ 
              scale: [1, 1.4, 1], 
              opacity: [0.4, 0.8, 0.4],
              boxShadow: ["0 0 0px #C9A84C", "0 0 10px #C9A84C", "0 0 0px #C9A84C"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Left wave line */}
          <motion.path
            d="M 50 50 Q 110 32, 170 50 Q 230 68, 240 50"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                'M 50 50 Q 110 32, 170 50 Q 230 68, 240 50',
                'M 50 50 Q 110 38, 170 50 Q 230 62, 240 50',
                'M 50 50 Q 110 32, 170 50 Q 230 68, 240 50',
              ],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Right wave line (mirrored) */}
          <motion.path
            d="M 260 50 Q 270 32, 330 50 Q 390 68, 450 50"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                'M 260 50 Q 270 32, 330 50 Q 390 68, 450 50',
                'M 260 50 Q 270 38, 330 50 Q 390 62, 450 50',
                'M 260 50 Q 270 32, 330 50 Q 390 68, 450 50',
              ],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Subtle second line — left */}
          <motion.path
            d="M 80 50 Q 130 40, 180 50 Q 230 60, 245 50"
            stroke="#a67c52"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                'M 80 50 Q 130 40, 180 50 Q 230 60, 245 50',
                'M 80 50 Q 130 46, 180 50 Q 230 54, 245 50',
                'M 80 50 Q 130 40, 180 50 Q 230 60, 245 50',
              ],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Subtle second line — right */}
          <motion.path
            d="M 255 50 Q 270 40, 320 50 Q 370 60, 420 50"
            stroke="#a67c52"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                'M 255 50 Q 270 40, 320 50 Q 370 60, 420 50',
                'M 255 50 Q 270 46, 320 50 Q 370 54, 420 50',
                'M 255 50 Q 270 40, 320 50 Q 370 60, 420 50',
              ],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
        </svg>
      </div>
    );
  }

  // variant === 'footer'
  return (
    <div
      data-rive
      className={`wave-decoration ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.12,
      }}
    >
      <svg
        viewBox="0 0 800 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Wave line 1 */}
        <motion.path
          d="M 0 60 Q 100 30, 200 60 Q 300 90, 400 60 Q 500 30, 600 60 Q 700 90, 800 60"
          stroke="#e3d1ba"
          strokeWidth="1.5"
          fill="none"
          animate={{
            d: [
              'M 0 60 Q 100 30, 200 60 Q 300 90, 400 60 Q 500 30, 600 60 Q 700 90, 800 60',
              'M 0 60 Q 100 45, 200 60 Q 300 75, 400 60 Q 500 45, 600 60 Q 700 75, 800 60',
              'M 0 60 Q 100 30, 200 60 Q 300 90, 400 60 Q 500 30, 600 60 Q 700 90, 800 60',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Wave line 2 */}
        <motion.path
          d="M 0 100 Q 100 70, 200 100 Q 300 130, 400 100 Q 500 70, 600 100 Q 700 130, 800 100"
          stroke="#e3d1ba"
          strokeWidth="1"
          fill="none"
          animate={{
            d: [
              'M 0 100 Q 100 70, 200 100 Q 300 130, 400 100 Q 500 70, 600 100 Q 700 130, 800 100',
              'M 0 100 Q 100 85, 200 100 Q 300 115, 400 100 Q 500 85, 600 100 Q 700 115, 800 100',
              'M 0 100 Q 100 70, 200 100 Q 300 130, 400 100 Q 500 70, 600 100 Q 700 130, 800 100',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Wave line 3 */}
        <motion.path
          d="M 0 140 Q 100 120, 200 140 Q 300 160, 400 140 Q 500 120, 600 140 Q 700 160, 800 140"
          stroke="#e3d1ba"
          strokeWidth="0.8"
          fill="none"
          animate={{
            d: [
              'M 0 140 Q 100 120, 200 140 Q 300 160, 400 140 Q 500 120, 600 140 Q 700 160, 800 140',
              'M 0 140 Q 100 130, 200 140 Q 300 150, 400 140 Q 500 130, 600 140 Q 700 150, 800 140',
              'M 0 140 Q 100 120, 200 140 Q 300 160, 400 140 Q 500 120, 600 140 Q 700 160, 800 140',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </svg>
    </div>
  );
});

WaveDecoration.displayName = 'WaveDecoration';

export default WaveDecoration;
