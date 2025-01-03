import React, { useState } from 'react';
import JSONViewer from '@textea/json-viewer';
import { useData } from '../contexts/DataContext';

interface JsonViewProps {
  data: any;
  name?: string;
  onEdit?: (edit: any) => void;
  editable?: boolean;
}

const JsonView: React.FC<JsonViewProps> = ({
  data,
  name = 'root',
  onEdit,
  editable = false
}) => {
  const { state } = useData();
  const [collapsed, setCollapsed] = useState(1);

  return (
    <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <button
          onClick={() => setCollapsed(collapsed === 1 ? 2 : 1)}
          className="text-blue-500 hover:text-blue-700"
        >
          {collapsed === 1 ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      <JSONViewer
        value={data}
        defaultInspectDepth={collapsed}
        theme={state.theme === 'dark' ? 'dark' : 'light'}
        editable={editable}
        onEdit={onEdit}
      />
    </div>
  );
};

export default JsonView; 