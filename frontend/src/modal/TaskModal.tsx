import React, { useState } from 'react'; // Tambahkan useState
import { X, Calendar, Check, ChevronDown } from 'lucide-react';
import { taskService } from '../services'; // Impor taskService dari index service

// --- TRANSLATIONS (Tetap sama) ---
const translations = {
  ID: {
    title: "Buat Tugas Baru", taskName: "Nama Tugas",
    priority: "Prioritas", deadline: "Tenggat Waktu",
    desc: "Deskripsi", save: "Simpan Task",
    cancel: "Batal",
    priorities: { high: "Tinggi", medium: "Sedang", low: "Rendah" },
    placeholders: {
      taskName: "Contoh: Maintenance Generator A",
      desc: "Jelaskan detail task, lokasi, peralatan yang digunakan, dll..."
    }
  },
  EN: {
    title: "Create New Task", taskName: "Task Name",
    priority: "Priority", deadline: "Deadline",
    desc: "Description", save: "Save Task",
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
  // 1. Inisialisasi state sesuai dengan CreateTaskDto backend
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium', // Default value sesuai opsi Enum backend
    deadline: ''
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const t = translations[lang];
  const modalBg = theme === 'light' ? 'bg-white' : 'bg-[#161b26]';
  const inputBg = theme === 'light' ? 'bg-slate-50' : 'bg-[#121212]';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const labelColor = theme === 'light' ? 'text-slate-500' : 'text-white';
  const borderColor = theme === 'light' ? 'border-slate-200' : 'border-white/5';

  // 2. Handler untuk perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Handler untuk mengirim data ke backend (Hit API)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mengirim payload ke endpoint POST /tasks
      await taskService.create(formData);
      alert(lang === 'ID' ? "Tugas berhasil disimpan!" : "Task saved successfully!");
      onClose();
      // Optional: Refresh halaman agar data baru muncul di dashboard
      window.location.reload(); 
    } catch (error) {
      console.error("Error saving task:", error);
      alert(lang === 'ID' ? "Gagal menyimpan tugas. Periksa inputan Anda." : "Failed to save task. Check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm">
      <div className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${modalBg} ${textColor} ${borderColor}`}>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-blue-600 opacity-40 z-10" />

        <div className="flex items-center justify-between p-5 md:p-3 border-b border-white/5 shrink-0">
          <h2 className="text-lg md:text-lg font-bold uppercase tracking-tight">{t.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* 4. Tambahkan onSubmit pada form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-modal-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Properti 'title' sesuai CreateTaskDto */}
            <div className="space-y-2 md:col-span-1">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.taskName} *</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text" 
                required
                placeholder={t.placeholders.taskName}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all`} 
              />
            </div>

            {/* Properti 'priority' sesuai CreateTaskDto */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.priority}</label>
              <div className="relative">
                <select 
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-emerald-500 cursor-pointer`}
                >
                  <option value="High">{t.priorities.high}</option>
                  <option value="Medium">{t.priorities.medium}</option>
                  <option value="Low">{t.priorities.low}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Properti 'deadline' (Ubah type ke 'date' agar format ISO sesuai IsDateString) */}
            <div className="space-y-2 md:col-span-1">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.deadline} *</label>
              <div className="relative">
                <input 
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  type="date" 
                  required
                  className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all`} 
                  style={{ colorScheme: theme === 'light' ? 'light' : 'dark' }}
                />
              </div>
            </div>

            {/* Properti 'description' sesuai CreateTaskDto */}
            <div className="space-y-2 md:col-span-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.desc} *</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4} 
                required
                placeholder={t.placeholders.desc} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none`} 
              />
            </div>
          </div>

          <div className={`p-5 md:p-6 border-t border-white/5 grid grid-cols-2 gap-4 shrink-0 ${modalBg}`}>
            <button 
              type="submit" 
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition-all uppercase ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Check size={18} /> {loading ? '...' : t.save}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border ${borderColor} ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200' : 'bg-zinc-800/50 hover:bg-zinc-800'} transition-colors uppercase`}>
              <X size={18} /> {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;