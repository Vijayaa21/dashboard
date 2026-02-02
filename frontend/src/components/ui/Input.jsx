import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg text-gray-100 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent ${
          error
            ? 'border-red-500 focus:ring-red-500/50'
            : 'border-gray-700 focus:ring-amber-500/50 focus:border-amber-500 hover:border-gray-600'
        } ${className}`}
        style={{
          boxShadow: error ? '0 0 10px rgba(239, 68, 68, 0.2)' : 'none',
        }}
        {...props}
      />
      {error && (
        <motion.p 
          className="mt-1 text-sm text-red-400"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
});

Input.displayName = 'Input';

export default Input;
