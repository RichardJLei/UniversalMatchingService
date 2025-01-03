import React, { createContext, useContext, useReducer } from 'react';

interface DataState {
  files: any[];
  parseResults: any[];
  comparisons: any[];
  selectedFiles: string[];
  theme: 'light' | 'dark';
}

type DataAction = 
  | { type: 'SET_FILES'; payload: any[] }
  | { type: 'SET_PARSE_RESULTS'; payload: any[] }
  | { type: 'SET_COMPARISONS'; payload: any[] }
  | { type: 'SET_SELECTED_FILES'; payload: string[] }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const initialState: DataState = {
  files: [],
  parseResults: [],
  comparisons: [],
  selectedFiles: [],
  theme: 'light'
};

const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
}>({
  state: initialState,
  dispatch: () => null
});

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case 'SET_FILES':
      return { ...state, files: action.payload };
    case 'SET_PARSE_RESULTS':
      return { ...state, parseResults: action.payload };
    case 'SET_COMPARISONS':
      return { ...state, comparisons: action.payload };
    case 'SET_SELECTED_FILES':
      return { ...state, selectedFiles: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext); 