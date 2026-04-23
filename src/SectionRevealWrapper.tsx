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
  return (
    <div 
      id={id}
      style={style}
      className={`w-full py-12 md:py-24 ${className}`}
    >
      <motion.div
        initial={isFirst ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex flex-col items-center"
      >
        <div className="w-full max-w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionRevealWrapper;
