"use client";

import { createContext, useState, useContext } from "react";

// Create a context
const PartContext = createContext();

// Create a provider component
export function PartProvider({ children }) {
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <PartContext.Provider value={{ selectedPart, setSelectedPart }}>
      {children}
    </PartContext.Provider>
  );
}

// Create a hook to use the PartContext
export function usePart() {
  return useContext(PartContext);
}
