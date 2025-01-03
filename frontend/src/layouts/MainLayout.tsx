import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useUser } from '../shared/contexts/UserContext';
import { useData } from '../shared/contexts/DataContext';

const MainLayout: React.FC = () => {
  const { user, isAdmin } = useUser();
  const { state, dispatch } = useData();

  const toggleTheme = () => {
    dispatch({
      type: 'SET_THEME',
      payload: state.theme === 'light' ? 'dark' : 'light'
    });
  };

  return (
    <div className={`min-h-screen ${state.theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                UniversalMatching
              </Link>
            </div>

            {/* Navigation Links */}
            {user && (
              <div className="flex space-x-4">
                <Link to="/files" className="nav-link">
                  File Management
                </Link>
                <Link to="/parse" className="nav-link">
                  Parse Files
                </Link>
                <Link to="/compare" className="nav-link">
                  Compare JSON
                </Link>
                {isAdmin && (
                  <Link to="/users" className="nav-link">
                    User Management
                  </Link>
                )}
              </div>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2">
                {state.theme === 'light' ? '🌙' : '☀️'}
              </button>
              {user ? (
                <div className="relative">
                  {/* User dropdown implementation */}
                </div>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div>
              <h3 className="text-sm font-semibold">About</h3>
              <p className="text-sm">PDF Processing and Comparison Tool</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Support</h3>
              <p className="text-sm">Contact: support@example.com</p>
            </div>
            <div>
              <p className="text-sm">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 