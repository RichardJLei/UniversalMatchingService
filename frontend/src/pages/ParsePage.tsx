import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../shared/contexts/DataContext';
import { api } from '../shared/utils/api';
import JsonView from '../shared/components/JsonView';

const ParsePage: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const { state } = useData();
  const navigate = useNavigate();
  
  const [parsing, setParsing] = useState(false);
  const [parseResult, setParseResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const file = state.files.find(f => f.id === fileId);

  useEffect(() => {
    const checkExistingResult = async () => {
      try {
        // Future log: Checking existing parse result
        const result = await api.getParseResult(fileId!);
        if (result) {
          setParseResult(result);
        }
      } catch (error) {
        // Result doesn't exist yet
      }
    };

    if (fileId) {
      checkExistingResult();
    }
  }, [fileId]);

  const handleParse = async () => {
    if (!file) return;

    setParsing(true);
    setError(null);

    try {
      // Future log: Starting parse operation
      const result = await api.parseFile(file.file_path);
      setParseResult(result);
      // Future log: Parse operation successful
    } catch (error) {
      // Future log: Parse operation failed
      setError('Failed to parse file');
    } finally {
      setParsing(false);
    }
  };

  if (!file) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p className="text-red-500">File not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Parse PDF</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/files')}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
            >
              Back to Files
            </button>
            <button
              onClick={handleParse}
              disabled={parsing}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
            >
              {parsing ? 'Parsing...' : 'Parse File'}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">File Details</h2>
          <p>Name: {file.name}</p>
          <p>Upload Date: {new Date(file.created_at).toLocaleString()}</p>
          <p>Status: {file.status}</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>

      {parseResult && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Parse Result</h2>
          <JsonView
            data={parseResult.parsed_data}
            name="parse_result"
            editable={false}
          />
        </div>
      )}
    </div>
  );
};

export default ParsePage; 