import { Variants } from 'framer-motion';

export const listStagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const cardSlide: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};
