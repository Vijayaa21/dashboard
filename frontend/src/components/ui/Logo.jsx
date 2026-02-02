import { motion } from 'framer-motion';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
  };

  const { icon, text } = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ rotate: 5, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
        
        {/* Inner design - stylized checkmark/task */}
        <path
          d="M14 24L20 30L34 16"
          stroke="url(#checkGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Decorative dots */}
        <circle cx="10" cy="14" r="2" fill="#fcd34d" opacity="0.6" />
        <circle cx="38" cy="34" r="2" fill="#fcd34d" opacity="0.6" />
      </motion.svg>
      
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text ${text}`}>
          TaskFlow
        </span>
      )}
    </div>
  );
};

export default Logo;
