import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './shared/contexts/UserContext';
import { DataProvider } from './shared/contexts/DataContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FileManagementPage from './pages/FileManagementPage';
import ParsePage from './pages/ParsePage';
import ComparePage from './pages/ComparePage';

function App() {
  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="files/*" element={<FileManagementPage />} />
              <Route path="parse/*" element={<ParsePage />} />
              <Route path="compare/*" element={<ComparePage />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </UserProvider>
  );
}

export default App; 