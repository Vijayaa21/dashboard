import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'text-gray-900 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 focus:ring-amber-500 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50',
    secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-600 border border-gray-700',
    danger: 'bg-red-600/80 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/20',
    success: 'bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500 shadow-lg shadow-emerald-500/20',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-600',
    outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10 focus:ring-amber-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;
