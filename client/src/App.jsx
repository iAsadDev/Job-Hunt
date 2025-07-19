import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/protectedRoute";
import About from "./components/About";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/Navbar";
import JobCreateForm from "./components/JobCreate";
import JobsList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import { JobProvider } from "./context/jobContext";
import MyJobs from "./components/Myjobs";
import JobEditForm from "./components/JobEditform";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
        <Navbar />
        <Routes>
          {/* Home page protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Jobs listing protected */}
          <Route
            path="/jobs/all-jobs"
            element={
              <ProtectedRoute>
                <JobsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/create"
            element={
              <ProtectedRoute>
                <JobCreateForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/jobs/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>}></Route>
          <Route
  path="/jobs/edit/:id"
  element={
    <ProtectedRoute>
      <JobEditForm />
    </ProtectedRoute>
  }
/>
          {/* Job details protected */}
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          {/* Redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
