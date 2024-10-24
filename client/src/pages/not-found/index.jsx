import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <AlertCircle className="w-24 h-24 text-red-500" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <button
            onClick={handleGoHome}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-colors duration-300 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
