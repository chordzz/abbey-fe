import { Routes, Route } from 'react-router-dom';

import './App.css';
import LoginPage from './components/login-page/Login';
import RegisterPage from './components/register-page/Register';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
