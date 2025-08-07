export const STYLES = {
  gradients: {
    primary: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    secondary: "linear-gradient(135deg, #10B981, #059669)",
    success: "linear-gradient(135deg, #10B981, #059669)",
    warning: "linear-gradient(135deg, #F59E0B, #D97706)",
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)",
    card: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))",
    header: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))",
  },
  shadows: {
    primary: "0 8px 25px rgba(59, 130, 246, 0.3)",
    secondary: "0 8px 25px rgba(16, 185, 129, 0.3)",
    warning: "0 8px 25px rgba(245, 158, 11, 0.3)",
    card: "0 10px 30px rgba(0, 0, 0, 0.1)",
    hover: "0 15px 35px rgba(59, 130, 246, 0.4)",
  },
  borders: {
    primary: "1px solid rgba(59, 130, 246, 0.1)",
    secondary: "1px solid rgba(16, 185, 129, 0.1)",
    warning: "1px solid rgba(245, 158, 11, 0.1)",
  },
} as const; 