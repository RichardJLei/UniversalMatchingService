import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../shared/contexts/DataContext';
import { api } from '../shared/utils/api';
import SmartTable from '../shared/components/SmartTable';

const FileManagementPage: React.FC = () => {
  const { state, dispatch } = useData();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Future log: Fetching files
        const files = await api.listFiles();
        dispatch({ type: 'SET_FILES', payload: files });
      } catch (error) {
        // Future log: File fetch error
        setError('Failed to load files');
      }
    };

    fetchFiles();
  }, [dispatch]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      // Future log: File upload started
      const file = files[0];
      const result = await api.uploadFile(file);
      
      // Update files list
      dispatch({
        type: 'SET_FILES',
        payload: [...state.files, result]
      });

      // Future log: File upload successful
    } catch (error) {
      // Future log: File upload error
      setError('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const columns = [
    { 
      field: 'name', 
      headerName: 'File Name', 
      flex: 2 
    },
    { 
      field: 'created_at', 
      headerName: 'Upload Date', 
      flex: 1,
      valueFormatter: (params: any) => new Date(params.value).toLocaleString()
    },
    { 
      field: 'size', 
      headerName: 'Size', 
      flex: 1,
      valueFormatter: (params: any) => {
        const bytes = params.value;
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      }
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">File Management</h1>
          <div className="flex items-center space-x-4">
            <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
                accept=".pdf"
              />
            </label>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <SmartTable
          data={state.files}
          columns={columns}
          onRowSelect={(rows) => navigate(`/files/${rows[0].id}`)}
          selectable={true}
          defaultSortField="created_at"
        />
      </div>

      {/* File Actions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Selected Files</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              if (state.selectedFiles.length > 0) {
                navigate(`/parse/${state.selectedFiles[0]}`);
              }
            }}
            disabled={state.selectedFiles.length !== 1}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
          >
            Parse Selected
          </button>
          <button
            onClick={() => {
              if (state.selectedFiles.length === 2) {
                navigate(`/compare?files=${state.selectedFiles.join(',')}`);
              }
            }}
            disabled={state.selectedFiles.length !== 2}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
          >
            Compare Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileManagementPage; 