import React, { useState, type ReactNode } from 'react';
import backgroundImage from './assets/background.webp'; 
import { 
  LayoutDashboard, FileText, ClipboardList, Settings, 
  Wrench, Monitor, ChevronDown, Plus, BarChart3, 
  CheckCircle2, Clock, Package, Edit2, Sun, Moon, Languages,
  Menu, X
} from 'lucide-react';

// --- TRANSLATION DICTIONARY ---
const translations = {
  ID: {
    dashboard: "Dashboard", operational: "Operasional", monitoring: "Monitoring",
    reachStacker: "Reach Stacker", monitorHeavy: "Monitor alat berat",
    monitoringBBM: "Monitoring BBM", dashboardBBM: "Dashboard konsumsi BBM",
    quickAction: "Aksi Cepat", newFieldReport: "Buat Laporan Lapangan Baru",
    recordWork: "Catat pekerjaan lapangan Anda", newTask: "Buat Tugas Baru",
    planWork: "Rencanakan pekerjaan Anda", orderParts: "Pesan Suku Cadang",
    addParts: "Tambahkan permintaan suku cadang", newRepair: "Perbaikan Baru",
    inputRepair: "Input permintaan perbaikan", statsOverview: "Statistik Overview",
    totalReports: "Jumlah Laporan", tasksDone: "Tugas Selesai",
    tasksInProgress: "Tugas Berlangsung", spareParts: "Suku Cadang",
    totalRepairs: "Total Perbaikan", priorityTasks: "Tugas Berlangsung (Prioritas)",
    dueTasks: "Tugas Berlangsung (Tenggat Waktu)",
    completedTasks: "Tugas Selesai", terang: "Terang", gelap: "Gelap", sistem: "Sistem"
  },
  EN: {
    dashboard: "Dashboard", operational: "Operational", monitoring: "Monitoring",
    reachStacker: "Reach Stacker", monitorHeavy: "Heavy equipment monitor",
    monitoringBBM: "Fuel Monitoring", dashboardBBM: "Fuel consumption dashboard",
    quickAction: "Quick Actions", newFieldReport: "Create New Field Report",
    recordWork: "Record your field work", newTask: "Create New Task",
    planWork: "Plan your work tasks", orderParts: "Order Spare Parts",
    addParts: "Add spare part requests", newRepair: "New Repair",
    inputRepair: "Input repair requests", statsOverview: "Statistics Overview",
    totalReports: "Total Reports", tasksDone: "Tasks Completed",
    tasksInProgress: "Tasks In Progress", spareParts: "Spare Parts",
    totalRepairs: "Total Repairs", priorityTasks: "In Progress (Priority)",
    dueTasks: "In Progress (Deadline)",
    completedTasks: "Completed Tasks", terang: "Light", gelap: "Dark", sistem: "System"
  }
};

interface DropdownItemProps { icon: ReactNode; label: string; sublabel?: string; theme: string; }
interface StatCardProps { icon: ReactNode; label: string; value: string | number; iconColor: string; theme: string; }
interface TaskItemProps { title: string; priority: string; progress: number; date: string; theme: string; }

const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile toggle
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  const t = translations[lang];
  const toggleMenu = (menu: string) => setActiveMenu(activeMenu === menu ? null : menu);

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 transition-colors duration-300 relative ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#0b0f1a] text-slate-100'
    }`}>
        {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src={backgroundImage} alt="Port" className={`w-full h-full object-cover transition-opacity duration-500 ${theme === 'light' ? 'opacity-30' : 'opacity-50 brightness-90'}`} />
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-white/1' : 'bg-gradient-to-b from-[#0b0f1a]/20 via-[#0b0f1a]/40 to-[#0b0f1a]/70'}`} />
      </div>

      {/* Navbar */}
      <nav className={`relative z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b shadow-lg ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161b26] border-white/10'}`}>
        <div className="flex items-center gap-4">
          <div className="bg-red-600 px-3 py-1 rounded shadow-lg"><span className="font-black italic text-xl text-white">SPIL</span></div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold tracking-tight leading-none">HVE ELECTRICAL SPIL</h1>
            <p className={`text-xs uppercase font-bold tracking-widest mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>PT. Salam Pacific Indonesia Lines</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <button className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-sm font-bold ${theme === 'light' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
            <LayoutDashboard size={18} /> {t.dashboard}
          </button>
          
          <div className="relative">
            <button onClick={() => toggleMenu('ops')} className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              <Settings size={18} /> {t.operational} <ChevronDown size={14} className={activeMenu === 'ops' ? 'rotate-180 transition-transform' : ''} />
            </button>
            {activeMenu === 'ops' && (
              <div className={`absolute top-full left-0 w-52 mt-2 border rounded-xl shadow-2xl py-2 z-[60] backdrop-blur-xl ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1c222d] border-white/10'}`}>
                <DropdownItem icon={<FileText size={16} className="text-blue-400"/>} label="Laporan Lapangan" theme={theme} />
                <DropdownItem icon={<ClipboardList size={16} className="text-emerald-400"/>} label="Tugas" theme={theme} />
                <DropdownItem icon={<Settings size={16} className="text-fuchsia-400"/>} label="Suku Cadang" theme={theme} />
                <DropdownItem icon={<Wrench size={16} className="text-orange-400"/>} label="Perbaikan" theme={theme} />
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => toggleMenu('monitor')} className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              <Monitor size={18} /> {t.monitoring} <ChevronDown size={14} className={activeMenu === 'monitor' ? 'rotate-180 transition-transform' : ''} />
            </button>
            {activeMenu === 'monitor' && (
              <div className={`absolute top-full left-0 w-64 mt-2 border rounded-xl shadow-2xl py-2 z-[60] backdrop-blur-xl ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1c222d] border-white/10'}`}>
                <DropdownItem icon={<Monitor size={20} className="text-blue-400"/>} label={t.reachStacker} sublabel={t.monitorHeavy} theme={theme} />
                <DropdownItem icon={<Clock size={20} className="text-orange-400"/>} label={t.monitoringBBM} sublabel={t.dashboardBBM} theme={theme} />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle */}
            <div className="relative">
              <button onClick={() => toggleMenu('theme')} className={`p-2 rounded-lg border ${theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-800 border-white/10 text-slate-300'}`}>
                {theme === 'light' ? <Sun size={20} className="text-yellow-500" /> : theme === 'dark' ? <Moon size={20} className="text-blue-400" /> : <Monitor size={20} />}
              </button>
              {activeMenu === 'theme' && (
                <div className={`absolute top-full right-0 mt-2 w-44 border rounded-xl shadow-2xl py-2 z-[60] ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1c222d] border-white/10'}`}>
                  <ThemeButton active={theme === 'light'} onClick={() => {setTheme('light'); setActiveMenu(null)}} icon={<Sun size={16} className="text-yellow-500" />} label={t.terang} theme={theme} />
                  <ThemeButton active={theme === 'dark'} onClick={() => {setTheme('dark'); setActiveMenu(null)}} icon={<Moon size={16} className="text-blue-400" />} label={t.gelap} theme={theme} />
                  <ThemeButton active={theme === 'system'} onClick={() => {setTheme('system'); setActiveMenu(null)}} icon={<Monitor size={16} />} label={t.sistem} theme={theme} />
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => toggleMenu('lang')} className={`px-3 py-1 rounded-lg text-xs font-black border flex items-center gap-2 ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-white/10'}`}>
                <Languages size={14} /> {lang}
              </button>
              {activeMenu === 'lang' && (
                <div className={`absolute top-full right-0 mt-2 w-36 border rounded-xl shadow-2xl overflow-hidden z-[60] ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#1c222d] border-white/10'}`}>
                  <LangButton active={lang === 'ID'} onClick={() => {setLang('ID'); setActiveMenu(null)}} label="Bahasa (ID)" theme={theme} />
                  <LangButton active={lang === 'EN'} onClick={() => {setLang('EN'); setActiveMenu(null)}} label="English (EN)" theme={theme} />
                </div>
              )}
            </div>
          </div>

        {/* Mobile Responsive */}
          <button 
            className="lg:hidden p-2 rounded-lg border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-0 z-[100] p-6 transition-colors ${theme === 'light' ? 'bg-white' : 'bg-[#161b26]'}`}>
          <div className="flex justify-between items-center mb-8">
             <div className="bg-red-600 px-3 py-1 rounded shadow-lg"><span className="font-black italic text-xl text-white">SPIL</span></div>
             <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
          </div>
          <div className="flex flex-col gap-4">
             <button className="flex items-center gap-3 text-lg font-bold p-3 border-b border-white/5 uppercase"><LayoutDashboard /> {t.dashboard}</button>
             <button className="flex items-center gap-3 text-lg font-bold p-3 border-b border-white/5 uppercase"><Settings /> {t.operational}</button>
             <button className="flex items-center gap-3 text-lg font-bold p-3 border-b border-white/5 uppercase"><Monitor /> {t.monitoring}</button>
             <div className="flex gap-4 mt-4">
               <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-3 border border-white/10 rounded-xl flex-1 flex justify-center">{theme === 'light' ? <Moon /> : <Sun />}</button>
               <button onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')} className="p-3 border border-white/10 rounded-xl flex-1 font-bold">{lang}</button>
             </div>
          </div>
        </div>
      )}

      <div className="relative z-40 h-[3px] bg-[#10b981] w-full" />
      <main className="relative z-10 p-4 md:p-8 max-w-[1400px] mx-auto space-y-12">
        
        {/* Actions Section*/}
        <section>
          <div className="flex items-center gap-2 mb-6 font-bold uppercase tracking-tight">
            <Plus className="text-blue-500" size={24} strokeWidth={3} />
            <h2 className={theme === 'light' ? 'text-slate-800 text-lg' : 'text-lg text-white'}>{t.quickAction}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <ActionCard color="bg-blue-600" icon={<FileText size={32}/>} title={t.newFieldReport} desc={t.recordWork} />
            <ActionCard color="bg-emerald-600" icon={<Edit2 size={32}/>} title={t.newTask} desc={t.planWork} />
            <ActionCard color="bg-fuchsia-600" icon={<Wrench size={32}/>} title={t.orderParts} desc={t.addParts} />
            <ActionCard color="bg-orange-600" icon={<ClipboardList size={32}/>} title={t.newRepair} desc={t.inputRepair} />
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <div className="flex items-center gap-2 mb-6 text-[#10b981] font-bold">
            <BarChart3 size={24} /> <h2 className="text-lg text-slate-100 uppercase tracking-widest">{t.statsOverview}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            <StatCard icon={<FileText size={26}/>} iconColor="text-blue-400" label={t.totalReports} value="16" theme={theme} />
            <StatCard icon={<CheckCircle2 size={26}/>} iconColor="text-emerald-400" label={t.tasksDone} value="2" theme={theme} />
            <StatCard icon={<Clock size={26}/>} iconColor="text-orange-400" label={t.tasksInProgress} value="7" theme={theme} />
            <StatCard icon={<Package size={26}/>} iconColor="text-fuchsia-400" label={t.spareParts} value="9" theme={theme} />
            <StatCard icon={<Wrench size={26}/>} iconColor="text-red-400" label={t.totalRepairs} value="5" theme={theme} />
          </div>
        </section>

        {/* Task Section*/}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
          {/* Column 1: Priority based Taks*/}
          <div className={`backdrop-blur-md p-6 rounded-2xl border shadow-xl ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-[#253f4b]/80 border-white/10'}`}>
            <h3 className="text-md font-bold mb-6 uppercase tracking-tight">{t.priorityTasks}</h3>
            <div className="space-y-4 max-h-[400px] md:max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              <TaskRow title="Kontrol DRF versi Master SPIL and Slave SPIL" priority="Tinggi" progress={50} date="Sabtu, 22 Nov 2025" theme={theme} />
              <TaskRow title="Kontrol Kalmar DRD" priority="Tinggi" progress={20} date="Sabtu, 22 Nov 2025" theme={theme} />
              <TaskRow title="Timbangan RS" priority="Tinggi" progress={80} date="Sabtu, 22 Nov 2025" theme={theme} />
              <TaskRow title="Skun Kabel AKKi" priority="Tinggi" progress={10} date="Minggu, 23 Nov 2025" theme={theme} />
            </div>
          </div>

          {/* Column 2: Deadline Based Tasks*/}
          <div className={`backdrop-blur-md p-6 rounded-2xl border shadow-xl ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-[#253f4b]/80 border-white/10'}`}>
            <h3 className="text-md font-bold mb-6 uppercase tracking-tight">{t.dueTasks}</h3>
            <div className="space-y-4 max-h-[400px] md:max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              <TaskRow title="Aplikasi Baca LCD Timbangan DRF" priority="Sedang" progress={70} date="Kamis, 11 Des 2025" theme={theme} />
              <TaskRow title="Monitoring Pembacaan Sensor via IOT" priority="Rendah" progress={40} date="Senin, 15 Des 2025" theme={theme} />
              <TaskRow title="Pemeriksaan Genset Depo 4" priority="Sedang" progress={90} date="Selasa, 16 Des 2025" theme={theme} />
              <TaskRow title="Kalibrasi Load Cell K32" priority="Tinggi" progress={30} date="Rabu, 17 Des 2025" theme={theme} />
            </div>
          </div>
          
          {/* Column 3: Done Tasks */}
          <div className={`backdrop-blur-md p-6 rounded-2xl border shadow-xl ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-[#253f4b]/80 border-white/10'}`}>
            <h3 className="text-md font-bold mb-6 uppercase tracking-tight text-slate-100">{t.completedTasks}</h3>
            <div className="space-y-4">
              <DoneItem title="Program Database BBM" desc="Revisi program database RFID BBM. Pindah datasheet di Spreadsheet" theme={theme} />
              <DoneItem title="Integrasi Program BBM IoT" desc="Integrasi Program BBM - Database Spreadsheet - Website" theme={theme} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// COMPONENTS 
const DropdownItem: React.FC<DropdownItemProps> = ({ icon, label, sublabel, theme }) => (
  <button className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all ${theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
    <span className="mt-0.5">{icon}</span>
    <div>
      <div className={`text-xs font-bold uppercase tracking-tight ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>{label}</div>
      {sublabel && <div className="text-xs text-slate-500 font-medium leading-none mt-1">{sublabel}</div>}
    </div>
  </button>
);

const ActionCard = ({ color, icon, title, desc }: any) => (
  <div className={`${color} p-6 rounded-2xl flex flex-col items-center text-center shadow-lg transition-all hover:scale-[1.02] cursor-pointer border border-white/10`}>
    <div className="bg-white/20 p-3 rounded-xl mb-4 shadow-inner text-white">{icon}</div>
    <h3 className="font-bold text-sm mb-1 uppercase tracking-tight text-white">{title}</h3>
    <p className="text-sm text-white/80 font-medium leading-tight">{desc}</p>
  </div>
);

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, iconColor, theme }) => (
  <div className={`p-6 rounded-xl flex flex-col gap-3 shadow-xl transition-colors ${theme === 'light' ? 'bg-white border border-slate-200' : 'bg-[#253f4b] border border-white/10'}`}>
    <div className={`p-2.5 w-fit rounded-lg shadow-inner ${theme === 'light' ? 'bg-slate-100' : 'bg-[#253f4b]'} ${iconColor}`}>{icon}</div>
    <span className={`text-sm font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-500' : 'text-slate-300'}`}>{label}</span>
    <span className={`text-3xl font-black leading-none ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{value}</span>
  </div>
);

const TaskRow: React.FC<TaskItemProps> = ({ title, priority, progress, date, theme }) => {
  const priorityColors: Record<string, string> = {
    'Tinggi': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Sedang': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Rendah': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className={`p-4 border rounded-xl flex flex-col gap-3 group transition-all cursor-pointer text-left ${theme === 'light' ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'}`}>
      <div className="flex justify-between items-start gap-2">
        <h4 className={`font-bold text-sm leading-snug flex-1 uppercase tracking-tight ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>{title}</h4>
        <span className={`px-2 py-0.5 rounded-full text-[0.65rem] font-black uppercase border ${priorityColors[priority] || priorityColors['Tinggi']}`}>
          {priority}
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm font-bold text-slate-500"><span>Progress</span><span className="text-blue-400">{progress}%</span></div>
        <div className={`h-1.5 w-full rounded-full overflow-hidden shadow-inner ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}><div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} /></div>
      </div>
      <p className="text-sm text-slate-500 font-bold flex items-center gap-1.5 italic"><Clock size={12} /> {date}</p>
    </div>
  );
};

const DoneItem = ({ title, desc, theme }: { title: string, desc: string, theme: string }) => (
  <div className={`p-4 border rounded-xl space-y-2 text-left transition-colors ${theme === 'light' ? 'bg-emerald-50 border-emerald-100' : 'bg-emerald-500/5 border-emerald-500/10'}`}>
    <div className="flex items-center gap-2 text-[#10b981]"><CheckCircle2 size={20} /><h4 className="font-bold text-sm uppercase tracking-tight">{title}</h4></div>
    <p className={`text-sm font-medium leading-relaxed italic ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>{desc}</p>
  </div>
);

const ThemeButton = ({ active, onClick, icon, label, theme }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-all ${active ? 'bg-blue-600/10 text-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'}`}>
    <div className="flex items-center gap-3">{icon} {label}</div>
    {active && <span className="text-green-500 text-sm">&#x2713;</span>}
  </button>
);

const LangButton = ({ active, onClick, label, theme }: any) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-all ${active ? 'bg-blue-600/10 text-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'}`}>
    {label}
    {active && <span className="text-green-500 text-sm">&#x2713;</span>}
  </button>
);

export default Dashboard;