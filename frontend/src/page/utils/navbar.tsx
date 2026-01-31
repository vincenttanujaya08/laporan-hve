import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, ClipboardList, Settings, 
  Wrench, Monitor, ChevronDown, Sun, Moon, Languages,
  Menu, X, Clock
} from 'lucide-react';

// --- TRANSLATION DICTIONARY ---
const translations = {
  ID: {
    dashboard: "Dashboard", operational: "Operasional", monitoring: "Monitoring",
    reachStacker: "Reach Stacker", monitorHeavy: "Monitor alat berat",
    monitoringBBM: "Monitoring BBM", dashboardBBM: "Dashboard konsumsi BBM",
    terang: "Terang", gelap: "Gelap", sistem: "Sistem"
  },
  EN: {
    dashboard: "Dashboard", operational: "Operational", monitoring: "Monitoring",
    reachStacker: "Reach Stacker", monitorHeavy: "Heavy equipment monitor",
    monitoringBBM: "Fuel Monitoring", dashboardBBM: "Fuel consumption dashboard",
    terang: "Light", gelap: "Dark", sistem: "System"
  }
};

interface NavbarProps {
  theme: 'light' | 'dark' | 'system';
  setTheme: (t: 'light' | 'dark' | 'system') => void;
  lang: 'ID' | 'EN';
  setLang: (l: 'ID' | 'EN') => void;
  activeMenu: string | null;
  toggleMenu: (menu: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (o: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  theme, setTheme, lang, setLang, activeMenu, toggleMenu, isMobileMenuOpen, setIsMobileMenuOpen 
}) => {
  const location = useLocation();
  const t = translations[lang];
  const isLight = theme === 'light';

  const isOpsActive = location.pathname === '/Reports';

  return (
    <>
      <nav className={`relative z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b shadow-lg transition-colors duration-300 ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#161b26] border-white/10'}`}>

        <div className="flex items-center gap-4">
          <Link to="/" className="bg-red-600 px-3 py-1 rounded shadow-lg">
            <span className="font-black italic text-xl text-white">SPIL</span>
          </Link>
          <div className="hidden sm:block text-left">
            <h1 className={`text-sm font-bold tracking-tight leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>HVE ELECTRICAL SPIL</h1>
            <p className={`text-xs uppercase font-bold tracking-widest mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              PT. Salam Pacific Indonesia Lines
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {/* Dashboard Button */}
          <Link to="/" className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-sm font-bold transition-all ${
            location.pathname === '/' 
              ? (isLight ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30')
              : (isLight ? 'text-slate-600 border-transparent hover:bg-slate-100' : 'text-slate-300 border-transparent hover:bg-white/5')}`}>
            <LayoutDashboard size={18} /> {t.dashboard}
          </Link>
          
          {/* Operational Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleMenu('ops')} 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold transition-all ${
                isOpsActive 
                  ? (isLight ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30')
                  : (isLight ? 'text-slate-600 border-transparent hover:bg-slate-100' : 'text-slate-300 border-transparent hover:bg-white/5')}`}>
              <Settings size={18} /> {t.operational} <ChevronDown size={14} className={activeMenu === 'ops' ? 'rotate-180 transition-transform' : ''} />
            </button>
            {activeMenu === 'ops' && (
              <div className={`absolute top-full left-0 w-52 mt-2 border rounded-xl shadow-2xl py-2 z-[60] backdrop-blur-xl ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#1c222d] border-white/10'
              }`}>
                <NavDropdownItem to="/Reports" onClick={() => toggleMenu('ops')} icon={<FileText size={16} className="text-blue-400"/>} label="Laporan Lapangan" theme={theme} />
                <NavDropdownItem to="#" onClick={() => toggleMenu('ops')} icon={<ClipboardList size={16} className="text-emerald-400"/>} label="Tugas" theme={theme} />
                <NavDropdownItem to="#" onClick={() => toggleMenu('ops')} icon={<Settings size={16} className="text-fuchsia-400"/>} label="Suku Cadang" theme={theme} />
                <NavDropdownItem to="#" onClick={() => toggleMenu('ops')} icon={<Wrench size={16} className="text-orange-400"/>} label="Perbaikan" theme={theme} />
              </div>
            )}
          </div>

          {/* Monitoring Dropdown */}
          <div className="relative">
            <button onClick={() => toggleMenu('monitor')} className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'
            }`}>
              <Monitor size={18} /> {t.monitoring} <ChevronDown size={14} className={activeMenu === 'monitor' ? 'rotate-180 transition-transform' : ''} />
            </button>
            {activeMenu === 'monitor' && (
              <div className={`absolute top-full left-0 w-64 mt-2 border rounded-xl shadow-2xl py-2 z-[60] backdrop-blur-xl ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#1c222d] border-white/10'
              }`}>
                <NavDropdownItem to="#" onClick={() => toggleMenu('monitor')} icon={<Monitor size={20} className="text-blue-400"/>} label={t.reachStacker} sublabel={t.monitorHeavy} theme={theme} />
                <NavDropdownItem to="#" onClick={() => toggleMenu('monitor')} icon={<Clock size={20} className="text-orange-400"/>} label={t.monitoringBBM} sublabel={t.dashboardBBM} theme={theme} />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <button onClick={() => toggleMenu('theme')} className={`p-2 rounded-lg border transition-colors ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-800 border-white/10 text-slate-300'
              }`}>
                {theme === 'light' ? <Sun size={20} className="text-yellow-500" /> : 
                 theme === 'dark' ? <Moon size={20} className="text-blue-400" /> : <Monitor size={20} />}
              </button>
              {activeMenu === 'theme' && (
                <div className={`absolute top-full right-0 mt-2 w-44 border rounded-xl shadow-2xl py-2 z-[60] ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#1c222d] border-white/10'
                }`}>
                  <MenuOption active={theme === 'light'} onClick={() => {setTheme('light'); toggleMenu('theme')}} icon={<Sun size={16} className="text-yellow-500" />} label={t.terang} theme={theme} />
                  <MenuOption active={theme === 'dark'} onClick={() => {setTheme('dark'); toggleMenu('theme')}} icon={<Moon size={16} className="text-blue-400" />} label={t.gelap} theme={theme} />
                  <MenuOption active={theme === 'system'} onClick={() => {setTheme('system'); toggleMenu('theme')}} icon={<Monitor size={16} />} label={t.sistem} theme={theme} />
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggleMenu('lang')} className={`px-3 py-1 rounded-lg text-xs font-black border flex items-center gap-2 transition-colors ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-800 border-white/10 text-slate-300'
              }`}>
                <Languages size={14} /> {lang}
              </button>
              {activeMenu === 'lang' && (
                <div className={`absolute top-full right-0 mt-2 w-36 border rounded-xl shadow-2xl overflow-hidden z-[60] ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#1c222d] border-white/10'
                }`}>
                  <MenuOption active={lang === 'ID'} onClick={() => {setLang('ID'); toggleMenu('lang')}} label="Bahasa (ID)" theme={theme} />
                  <MenuOption active={lang === 'EN'} onClick={() => {setLang('EN'); toggleMenu('lang')}} label="English (EN)" theme={theme} />
                </div>
              )}
            </div>
          </div>

          <button className="lg:hidden p-2 rounded-lg border border-white/10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} className={isLight ? 'text-slate-900' : 'text-white'} /> : <Menu size={24} className={isLight ? 'text-slate-900' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-0 z-[100] p-6 transition-colors ${isLight ? 'bg-white text-slate-900' : 'bg-[#161b26] text-white'}`}>
          <div className="flex justify-between items-center mb-8">
             <div className="bg-red-600 px-3 py-1 rounded shadow-lg"><span className="font-black italic text-xl text-white">SPIL</span></div>
             <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
          </div>
          <div className="flex flex-col gap-4">
             <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 text-lg font-bold p-3 border-b border-white/5 uppercase ${location.pathname === '/' ? 'text-emerald-500' : ''}`}><LayoutDashboard /> {t.dashboard}</Link>
             <Link to="/Reports" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 text-lg font-bold p-3 border-b border-white/5 uppercase ${location.pathname === '/Reports' ? 'text-emerald-500' : ''}`}><FileText /> Laporan Lapangan</Link>
             <div className="flex gap-4 mt-4">
               <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-3 border border-white/10 rounded-xl flex-1 flex justify-center ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>{isLight ? <Moon /> : <Sun />}</button>
               <button onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')} className={`p-3 border border-white/10 rounded-xl flex-1 font-bold ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>{lang}</button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavDropdownItem = ({ to, onClick, icon, label, sublabel, theme }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick} 
      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all ${
        isActive 
          ? (theme === 'light' ? 'bg-blue-50' : 'bg-blue-500/10') 
          : (theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-white/5')}`}>
      <span className="mt-0.5">{icon}</span>
      <div>
        <div className={`text-xs font-bold uppercase tracking-tight ${
          isActive 
            ? 'text-blue-500' : (theme === 'light' ? 'text-slate-700' : 'text-slate-300')
        }`}>{label}</div>
        {sublabel && <div className="text-xs text-slate-500 font-medium leading-none mt-1">{sublabel}</div>}
      </div>
    </Link>
  );
};

const MenuOption = ({ active, onClick, icon, label, theme }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-all ${
    active ? 'bg-blue-600/10 text-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 
    theme === 'light' ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-300 hover:bg-white/5'
  }`}>
    <div className="flex items-center gap-3">{icon} {label}</div>
    {active && <span className="text-blue-500 text-sm">✅</span>}
  </button>
);

export default Navbar;