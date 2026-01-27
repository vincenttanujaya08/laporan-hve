import React from 'react';
import { X, Calendar, Check, ChevronDown } from 'lucide-react';

// --- TRANSLATIONS ---
const translations = {
  ID: {
    title: "Buat Tugas Baru",taskName: "Nama Tugas",
    priority: "Prioritas",deadline: "Tenggat Waktu",
    desc: "Deskripsi",save: "Simpan Task",
    cancel: "Batal",

    priorities: { high: "Tinggi", medium: "Sedang", low: "Rendah" },

    placeholders: {
      taskName: "Contoh: Maintenance Generator A",
      desc: "Jelaskan detail task, lokasi, peralatan yang digunakan, dll..."
    }
  },
  EN: {
    title: "Create New Task",taskName: "Task Name",
    priority: "Priority",deadline: "Deadline",
    desc: "Description",save: "Save Task",
    cancel: "Cancel",

    priorities: { high: "High", medium: "Medium", low: "Low" },

    placeholders: {
      taskName: "Example: Generator A Maintenance",
      desc: "Explain task details, location, equipment used, etc..."
    }
  }
};

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'system';
  lang: 'ID' | 'EN';
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, theme, lang }) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const modalBg = theme === 'light' ? 'bg-white' : 'bg-[#161b26]';
  const inputBg = theme === 'light' ? 'bg-slate-50' : 'bg-[#121212]';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const labelColor = theme === 'light' ? 'text-slate-500' : 'text-white';
  const borderColor = theme === 'light' ? 'border-slate-200' : 'border-white/5';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm">
      
      <div className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${modalBg} ${textColor} ${borderColor}`}>

        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-blue-600 opacity-40 z-10" />

        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-3 border-b border-white/5 shrink-0">
          <h2 className="text-lg md:text-lg font-bold uppercase tracking-tight">{t.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-modal-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nama Tugas */}
            <div className="space-y-2 md:col-span-1">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.taskName} *</label>
              <input 
                type="text" 
                placeholder={t.placeholders.taskName}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all`} 
              />
            </div>

            {/* Prioritas */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.priority}</label>
              <div className="relative">
                <select className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-emerald-500 cursor-pointer`}>
                  <option value="tinggi">{t.priorities.high}</option>
                  <option value="sedang">{t.priorities.medium}</option>
                  <option value="rendah">{t.priorities.low}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Tenggat Waktu (Custom Format yyyy/dd/mm) */}
            <div className="space-y-2 md:col-span-1">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.deadline}</label>
              <div className="relative">
                <input 
                  type="text" placeholder="yyyy/dd/mm"
                  className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all`} />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-2 md:col-span-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.desc} *</label>
              <textarea 
                rows={4} 
                placeholder={t.placeholders.desc} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none`} 
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className={`p-5 md:p-6 border-t border-white/5 grid grid-cols-2 gap-4 shrink-0 ${modalBg}`}>
          <button 
            type="submit" 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition-all uppercase">
            <Check size={18} /> {t.save}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border ${borderColor} ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200' : 'bg-zinc-800/50 hover:bg-zinc-800'} transition-colors uppercase`}>
            <X size={18} /> {t.cancel}
          </button>
        </div>
      </div>

      <style>{`
        .custom-modal-scroll::-webkit-scrollbar { width: 6px; }
        .custom-modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-modal-scroll::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 10px; }
        .custom-modal-scroll::-webkit-scrollbar-button { display: none; }
      `}</style>
    </div>
  );
};

export default TaskModal;