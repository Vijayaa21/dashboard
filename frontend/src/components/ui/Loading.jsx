import { Loader2 } from 'lucide-react';

const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizes[size]} text-blue-600 animate-spin`} />
      {text && <p className="mt-2 text-gray-600">{text}</p>}
    </div>
  );
};

export const FullPageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Loading size="lg" text="Loading..." />
  </div>
);

export default Loading;
