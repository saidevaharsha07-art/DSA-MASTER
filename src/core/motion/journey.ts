import { Variants } from 'framer-motion';

export const nodeReveal: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
};

export const pathDraw: Variants = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1, transition: { duration: 1, ease: 'easeInOut' } },
};
