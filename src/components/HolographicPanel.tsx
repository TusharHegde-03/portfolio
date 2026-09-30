import React from 'react';
import { motion } from 'framer-motion';

interface HolographicPanelProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  cornerNotches?: boolean;
  onClick?: () => void;
}

export const HolographicPanel: React.FC<HolographicPanelProps> = ({
  children,
  className = '',
  glowOnHover = true,
  cornerNotches = true,
  onClick
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={glowOnHover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`relative group bg-[#0a1120]/80 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6 transition-all duration-300 ${
        glowOnHover ? 'hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Corner HUD Accent Notches */}
      {cornerNotches && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 transition-colors group-hover:border-cyan-300" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 transition-colors group-hover:border-cyan-300" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 transition-colors group-hover:border-cyan-300" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 transition-colors group-hover:border-cyan-300" />
        </>
      )}

      {/* Subtle Inner Grid Overlay */}
      <div className="absolute inset-0 bg-scanline pointer-events-none opacity-20 rounded-lg" />

      {/* Panel Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
