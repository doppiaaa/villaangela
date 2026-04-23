import { memo } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

interface RealShaderBackgroundProps {
  color1?: string;
  color2?: string;
  color3?: string;
  opacity?: number;
  type?: 'plane' | 'sphere' | 'waterPlane';
  uSpeed?: number;
  uStrength?: number;
  uDensity?: number;
  uFrequency?: number;
}

/**
 * Real WebGL 3D Shader Background using @shadergradient/react.
 * Provides a high-fidelity, high-dynamic range moving gradient.
 * Optimized with low opacity and soft-light blend mode to integrate with brand colors.
 */
const RealShaderBackground = memo(({
  color1 = "#C8B89A",
  color2 = "#F5F0E8",
  color3 = "#C9A84C",
  opacity = 0.35,
  type = 'waterPlane',
  uSpeed = 0.3,
  uStrength = 2,
  uDensity = 1.2,
  uFrequency = 5.5,
}: RealShaderBackgroundProps) => {
  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ isolation: 'isolate', background: 'transparent', overflow: 'hidden' }}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: 0.2, 
          mixBlendMode: 'normal',
          overflow: 'hidden',
          borderRadius: 'inherit'
        }}
      >
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          pixelDensity={1.0}
          fov={45}
        >
          <ShaderGradient
            control="props"
            animate="on"
            type={type}
            color1={color1}
            color2={color2}
            color3={color3}
            uSpeed={uSpeed}
            uStrength={uStrength}
            uDensity={uDensity}
            uFrequency={uFrequency}
            cDistance={32}
            cPolarAngle={125}
            brightness={1.0}
            grain="on"
          />
        </ShaderGradientCanvas>
      </div>
    </div>
  );
});

RealShaderBackground.displayName = 'RealShaderBackground';

export default RealShaderBackground;
