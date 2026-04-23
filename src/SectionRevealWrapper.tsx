import { useRef, ReactNode, CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SectionRevealWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: CSSProperties;
  isFirst?: boolean;
}

/**
 * Wrapper to create a "Sticky Stacking" reveal effect.
 * Sections appear to build on top of each other with scale and opacity transitions.
 * Inspired by shadergradient.co and modern Figma-style prototypes.
 */
const SectionRevealWrapper = ({ children, id, className = '', style = {}, isFirst = false }: SectionRevealWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Robust reveal: Scale from 0.95 to 1, opacity from 0 to 1
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.95, 1, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.3, 1, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [100, 0, 0, 0]);

  return (
    <div 
      ref={containerRef} 
      id={id}
      style={{
        ...style,
        position: 'relative'
      }}
      className={`w-full flex flex-col justify-center py-16 md:py-32 outline-none ${className}`}
    >
      <motion.div
        style={{ 
          scale, 
          opacity, 
          y: isFirst ? 0 : y,
        }}
        className="w-full h-full flex flex-col items-center"
      >
        <div className="w-full max-w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionRevealWrapper;
