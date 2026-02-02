import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizes[size]} text-amber-500`} />
      </motion.div>
      {text && (
        <motion.p 
          className="mt-3 text-gray-400"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
};

export const FullPageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
        animate={{ 
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 20px rgba(245, 158, 11, 0.4)',
            '0 0 40px rgba(245, 158, 11, 0.6)',
            '0 0 20px rgba(245, 158, 11, 0.4)',
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <Loading size="lg" text="Loading..." />
    </motion.div>
  </div>
);

export default Loading;
