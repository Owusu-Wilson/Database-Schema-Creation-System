
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { ProjectsPage } from './pages/ProjectsPage';
import ProtectedRoute from './components/ProtectedRoute';
function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin"></div>
        <div className="absolute w-16 h-16 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <h1 className="mt-6 text-2xl font-semibold text-gray-800 animate-pulse">
        Loading...
      </h1>
    </div>
  );
}


function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
    <Router>
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route path="/project/*" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />

      </Routes>
      </Suspense>
    </Router>
    </AuthProvider>
    </Provider>
  );
}

export default App;