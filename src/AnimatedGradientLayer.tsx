import { memo } from 'react';

interface AnimatedGradientLayerProps {
  colors: [string, string, string];
  opacity?: number;
  duration?: number;
  blendMode?: string;
  className?: string;
}

/**
 * Animated CSS gradient layer — warm, slow-moving background effect.
 * Uses @keyframes defined in index.css for the animation.
 * Hidden on mobile (<768px) via CSS and when prefers-reduced-motion is set.
 */
const AnimatedGradientLayer = memo(({
  colors,
  opacity = 0.5,
  duration = 30,
  blendMode = 'normal',
  className = '',
}: AnimatedGradientLayerProps) => {
  return (
    <div
      data-shader
      className={`animated-gradient-layer ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: blendMode as any,
        background: `linear-gradient(
          135deg,
          ${colors[0]} 0%,
          ${colors[1]} 25%,
          ${colors[2]} 50%,
          ${colors[1]} 75%,
          ${colors[0]} 100%
        )`,
        backgroundSize: '400% 400%',
        animation: `gradientShift ${duration}s ease-in-out infinite`,
        borderRadius: 'inherit',
      }}
    />
  );
});

AnimatedGradientLayer.displayName = 'AnimatedGradientLayer';

export default AnimatedGradientLayer;
