import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface SmartTableProps {
  data: any[];
  columns: any[];
  onRowSelect?: (rows: any[]) => void;
  selectable?: boolean;
  defaultSortField?: string;
}

const SmartTable: React.FC<SmartTableProps> = ({
  data,
  columns,
  onRowSelect,
  selectable = false,
  defaultSortField
}) => {
  const [gridApi, setGridApi] = useState(null);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    
    // Set default sorting if specified
    if (defaultSortField) {
      params.api.setSortModel([{ colId: defaultSortField, sort: 'desc' }]);
    }
  };

  const onSelectionChanged = () => {
    if (onRowSelect && gridApi) {
      const selectedRows = gridApi.getSelectedRows();
      onRowSelect(selectedRows);
    }
  };

  return (
    <div className="ag-theme-alpine w-full h-[600px] dark:ag-theme-alpine-dark">
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        rowSelection={selectable ? 'multiple' : undefined}
        onSelectionChanged={onSelectionChanged}
        pagination={true}
        paginationPageSize={20}
        enableCellTextSelection={true}
        suppressRowClickSelection={!selectable}
      />
    </div>
  );
};

export default SmartTable; 