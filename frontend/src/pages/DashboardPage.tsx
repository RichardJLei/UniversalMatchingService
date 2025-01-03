import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../shared/contexts/UserContext';
import { useData } from '../shared/contexts/DataContext';
import { api } from '../shared/utils/api';
import SmartTable from '../shared/components/SmartTable';

const DashboardPage: React.FC = () => {
  const { user, loading } = useUser();
  const { state, dispatch } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Future log: Fetching dashboard data
        const [files, comparisons] = await Promise.all([
          api.listFiles(),
          api.listComparisons()
        ]);

        dispatch({ type: 'SET_FILES', payload: files });
        dispatch({ type: 'SET_COMPARISONS', payload: comparisons });
      } catch (error) {
        // Future log: Dashboard data fetch error
        console.error('Error fetching dashboard data:', error);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  const recentFilesColumns = [
    { field: 'name', headerName: 'File Name', flex: 1 },
    { field: 'created', headerName: 'Upload Date', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 }
  ];

  const recentComparisonsColumns = [
    { field: 'created_at', headerName: 'Date', flex: 1 },
    { field: 'match_percentage', headerName: 'Match %', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.email}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
            <h3 className="font-semibold">Total Files</h3>
            <p className="text-2xl">{state.files.length}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
            <h3 className="font-semibold">Parsed Documents</h3>
            <p className="text-2xl">{state.parseResults.length}</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
            <h3 className="font-semibold">Comparisons</h3>
            <p className="text-2xl">{state.comparisons.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
          <SmartTable
            data={state.files.slice(0, 5)}
            columns={recentFilesColumns}
            onRowSelect={(rows) => navigate(`/files/${rows[0].id}`)}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Comparisons</h2>
          <SmartTable
            data={state.comparisons.slice(0, 5)}
            columns={recentComparisonsColumns}
            onRowSelect={(rows) => navigate(`/compare/${rows[0].id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 