import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { Learn } from './pages/Learn';
import { Compete } from './pages/Compete';
import { About } from './pages/About';
import Contact from './pages/Contact';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { AnalysisDetail } from './pages/AnalysisDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col">
        <AppHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/compete" element={<Compete />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analysis/:id" element={<AnalysisDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </AuthProvider>
  );
}

export default App;