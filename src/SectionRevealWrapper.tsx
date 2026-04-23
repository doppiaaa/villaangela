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

  // Entry: Scale from 0.9 to 1, opacity from 0.4 to 1
  // Exit: Scale stays at 1 (or slightly scales down), opacity stays at 1
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.9, 1], [0.95, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0.4, 1, 1, 0.4]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], ["8px", "0px", "0px", "8px"]);
  
  // Parallax effect for content inside
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div 
      ref={containerRef} 
      id={id}
      style={{
        ...style,
        position: 'relative'
      }}
      className={`min-h-screen w-full flex flex-col justify-center py-12 md:py-24 outline-none ${className}`}
    >
      <motion.div
        style={{ 
          scale, 
          opacity, 
          filter: `blur(${blur})`,
          y: isFirst ? 0 : y,
          position: 'sticky',
          top: '2rem', // Slight offset from top
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
