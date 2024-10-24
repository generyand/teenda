import { useNavigate } from 'react-router-dom';
import { AlertOctagon, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

function UnauthPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 to-gray-200 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <AlertOctagon className="w-24 h-24 mx-auto text-red-500" />
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Access Denied
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          You don't have permission to view this page. Please log in or contact an administrator if you believe this is an error.
        </p>
        <div className="flex flex-col justify-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="inline-flex items-center px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={handleLogin}
            className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UnauthPage;
