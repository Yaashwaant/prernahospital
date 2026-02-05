/**
 * Centralized animation variants for Framer Motion
 * Provides consistent, reusable animation configurations
 */

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05 }
};

export const slideInFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

export const springBounce = {
  hover: { scale: 1.1 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

export const rotateOnHover = {
  rest: { rotate: 0 },
  hover: { rotate: 5 }
};
