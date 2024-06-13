import React, { createContext, useState } from 'react';

// Creating a context with default value
const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [contextData, setContextData] = useState({
    selectedNode: 'Initial Value',
  });

  return (
    <Context.Provider value={{ contextData, setContextData }}>
      {children}
    </Context.Provider>
  );
};

export default Context;