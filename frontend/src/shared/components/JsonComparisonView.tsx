import React from 'react';
import { useData } from '../contexts/DataContext';
import JsonView from './JsonView';

interface JsonComparisonViewProps {
  original: any;
  modified: any;
  differences: {
    added: string[];
    removed: string[];
    modified: Array<{
      key: string;
      value1: any;
      value2: any;
    }>;
    match_percentage: number;
  };
}

const JsonComparisonView: React.FC<JsonComparisonViewProps> = ({
  original,
  modified,
  differences
}) => {
  const { state } = useData();
  const isDark = state.theme === 'dark';

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Comparison Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Match Percentage</h3>
            <div className="text-2xl font-bold text-blue-500">
              {differences.match_percentage.toFixed(1)}%
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Changes</h3>
            <ul className="list-disc list-inside">
              <li className="text-green-500">Added: {differences.added.length}</li>
              <li className="text-red-500">Removed: {differences.removed.length}</li>
              <li className="text-yellow-500">Modified: {differences.modified.length}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Changes */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Original</h3>
          <JsonView
            data={original}
            name="original"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Modified</h3>
          <JsonView
            data={modified}
            name="modified"
          />
        </div>
      </div>

      {/* Differences List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Detailed Changes</h3>
        <div className="space-y-2">
          {differences.added.length > 0 && (
            <div>
              <h4 className="font-semibold text-green-500">Added Fields</h4>
              <ul className="list-disc list-inside">
                {differences.added.map(key => (
                  <li key={key}>{key}</li>
                ))}
              </ul>
            </div>
          )}
          {differences.removed.length > 0 && (
            <div>
              <h4 className="font-semibold text-red-500">Removed Fields</h4>
              <ul className="list-disc list-inside">
                {differences.removed.map(key => (
                  <li key={key}>{key}</li>
                ))}
              </ul>
            </div>
          )}
          {differences.modified.length > 0 && (
            <div>
              <h4 className="font-semibold text-yellow-500">Modified Fields</h4>
              <ul className="list-disc list-inside">
                {differences.modified.map(change => (
                  <li key={change.key}>
                    {change.key}: {JSON.stringify(change.value1)} → {JSON.stringify(change.value2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonComparisonView; 