import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './page/utils/navbar';
import Dashboard from './page/Dashboard';
import ReportPage from './page/ReportPage';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = (menu: string) => setActiveMenu(activeMenu === menu ? null : menu);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-slate-50' : 'bg-[#0b0f1a]'}`}>
        <Navbar 
          theme={theme} setTheme={setTheme} 
          lang={lang} setLang={setLang}
          activeMenu={activeMenu} toggleMenu={toggleMenu}
          isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>

        <Routes>
          <Route path="/" element={<Dashboard theme={theme} lang={lang} />} />
          <Route path="/Reports" element={<ReportPage theme={theme} lang={lang} />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;