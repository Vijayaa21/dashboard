import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Select = forwardRef(({
  label,
  options = [],
  error,
  className = '',
  placeholder = 'Select an option',
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
      <div className="relative">
        <select
          ref={ref}
          className={`w-full px-4 py-2.5 bg-gray-800/50 border rounded-lg appearance-none text-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent cursor-pointer ${
            error
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-gray-700 focus:ring-amber-500/50 focus:border-amber-500 hover:border-gray-600'
          } ${className}`}
          {...props}
        >
          <option value="" className="bg-gray-800">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-800">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
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

Select.displayName = 'Select';

export default Select;
