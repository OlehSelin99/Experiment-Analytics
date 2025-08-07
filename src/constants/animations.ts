export const ANIMATIONS = {
  fadeInUp: {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  slideInLeft: {
    from: { transform: "translateX(-30px)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
  slideInRight: {
    from: { transform: "translateX(30px)", opacity: 0 },
    to: { transform: "translateX(0)", opacity: 1 },
  },
  slideDown: {
    from: { transform: "translateY(-100%)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
  float: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" },
  },
  bounce: {
    "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
    "40%": { transform: "translateY(-20px)" },
    "60%": { transform: "translateY(-10px)" },
  },
} as const; 