import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './components/Landingpage.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login';
import MainPage from './components/MainPage';


function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <div>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mainPage"
          element={
            isAuthenticated ? <MainPage /> : <Navigate to="/mainPage" replace />
          }
        />
      </Routes>
    </div>
  )
}

export default App
