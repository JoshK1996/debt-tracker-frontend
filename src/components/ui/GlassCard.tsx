'use client';

import { Paper, PaperProps } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme/ThemeProvider';

interface GlassCardProps extends PaperProps {
  hoverEffect?: boolean;
  gradient?: string;
  animate?: boolean;
}

export function GlassCard({
  children,
  hoverEffect = true,
  gradient,
  animate = false,
  sx,
  ...props
}: GlassCardProps) {
  const { mode } = useTheme();
  
  const defaultGradient = mode === 'light'
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))'
    : 'linear-gradient(135deg, rgba(40, 40, 40, 0.9), rgba(20, 20, 20, 0.7))';
  
  // Base styles for the glass effect
  const glassStyles = {
    background: gradient || defaultGradient,
    backdropFilter: 'blur(16px)',
    border: `1px solid ${mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
    boxShadow: mode === 'light' 
      ? '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
      : '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    ...sx,
  };
  
  // If animations are disabled, return a simple Paper component
  if (!animate) {
    return (
      <Paper
        elevation={0}
        sx={glassStyles}
        {...props}
      >
        {children}
      </Paper>
    );
  }
  
  // With animations enabled, use motion.div with Paper
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={0}
        sx={glassStyles}
        {...props}
      >
        {children}
      </Paper>
    </motion.div>
  );
}