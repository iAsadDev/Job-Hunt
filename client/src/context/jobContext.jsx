import React, { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  const onSelectJob = (jobId) => {
    setSelectedJobId(jobId);
    console.log("Selected Job ID via Context:", jobId);
  };

  return (
    <JobContext.Provider value={{ selectedJobId, onSelectJob }}>
      {children}
    </JobContext.Provider>
  );
};
