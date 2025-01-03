import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../shared/contexts/UserContext';
import { authService } from '../shared/utils/auth';

const LoginPage: React.FC = () => {
  const { user, loading } = useUser();

  const handleGoogleSignIn = async () => {
    try {
      // Future log: Google sign-in attempt
      await authService.signInWithGoogle();
    } catch (error) {
      // Future log: Sign-in error
      console.error('Sign-in error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to UniversalMatching
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            PDF Processing and Comparison Tool
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              {/* Google icon SVG path */}
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 