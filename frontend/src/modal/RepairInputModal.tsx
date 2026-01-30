import React from 'react';
import { X, Calendar, Check, ChevronDown } from 'lucide-react';

// --- MODAL TRANSLATIONS ---
const translations = {
  ID: {
    title: "Buat Perbaikan Baru",
    repairItem: "Item Perbaikan",
    unit: "Unit Alat",
    location: "Lokasi Operasi Alat",
    damageDesc: "Deskripsi Kerusakan",
    statusDate: "Status & Tanggal",
    status: "Status Perbaikan",
    receivedDate: "Tanggal Masuk",
    save: "Simpan",
    cancel: "Batal",
    placeholders: {
      repairItem: "Contoh: Motor Servo",
      unit: "Contoh: Robot KUKA",
      location: "Contoh: Area Produksi 1",
      damageDesc: "Jelaskan kerusakan yang terjadi...",
      dateSub: "Masukkan tanggal ketika barang diterima"
    },
    statusOptions: ["Barang Diterima", "Sedang Diperiksa", "Dalam Pengerjaan", "Selesai"]
  },
  EN: {
    title: "Create New Repair",
    repairItem: "Repair Item",
    unit: "Equipment Unit",
    location: "Equipment Operation Location",
    damageDesc: "Damage Description",
    statusDate: "Status & Date",
    status: "Repair Status",
    receivedDate: "Entry Date",
    save: "Save",
    cancel: "Cancel",
    placeholders: {
      repairItem: "Example: Servo Motor",
      unit: "Example: KUKA Robot",
      location: "Example: Production Area 1",
      damageDesc: "Explain the damage that occurred...",
      dateSub: "Enter the date when items were received"
    },
    statusOptions: ["Item Received", "Checking", "In Progress", "Completed"]
  }
};

interface RepairInputProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'system';
  lang: 'ID' | 'EN';
}

const RepairInputModal: React.FC<RepairInputProps> = ({ isOpen, onClose, theme, lang }) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const modalBg = theme === 'light' ? 'bg-white' : 'bg-[#1e1e1e]';
  const inputBg = theme === 'light' ? 'bg-slate-50' : 'bg-[#121212]';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const labelColor = theme === 'light' ? 'text-slate-500' : 'text-slate-100';
  const borderColor = theme === 'light' ? 'border-slate-200' : 'border-white/5';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm">
      
      <div className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${modalBg} ${textColor} ${borderColor}`}>
        
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-40 z-10" />

        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5 shrink-0">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight">{t.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-modal-scroll">
          <div className="space-y-6">
            
            {/* Item Perbaikan */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.repairItem} *</label>
              <input 
                type="text" 
                placeholder={t.placeholders.repairItem}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`} />
            </div>

            {/* Unit Alat */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.unit} *</label>
              <input 
                type="text" 
                placeholder={t.placeholders.unit}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`} />
            </div>

            {/* Lokasi Operasi */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.location} *</label>
              <input 
                type="text" 
                placeholder={t.placeholders.location}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`} />
            </div>

            {/* Deskripsi Kerusakan */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.damageDesc} *</label>
              <textarea 
                rows={4} 
                placeholder={t.placeholders.damageDesc} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none`} />
            </div>

            {/* Status & Tanggal Section */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold">
                <Calendar size={18} />
                <h3 className="text-xs uppercase tracking-widest">{t.statusDate}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.status}</label>
                  <div className="relative">
                    <select className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-indigo-500 cursor-pointer`}>
                      {t.statusOptions.map((opt, i) => (
                        <option key={i} value={opt.toLowerCase().replace(" ", "_")}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.receivedDate} *</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-indigo-500`}
                      style={{ colorScheme: theme === 'light' ? 'light' : 'dark' }}/>
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                  </div>
                  <p className="text-[10px] text-slate-500 italic mt-1">{t.placeholders.dateSub}</p>
                </div>
              </div>
            </div>
          </div>
        </form>


        <div className={`p-5 md:p-6 border-t border-white/5 flex gap-4 shrink-0 ${modalBg}`}>
          <button 
            type="submit" 
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20 transition-all uppercase">
            {t.save}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className={`px-8 py-3 rounded-xl font-bold text-sm border ${borderColor} ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200' : 'bg-zinc-800/50 hover:bg-zinc-800'} transition-colors uppercase`}>
            {t.cancel}
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

export default RepairInputModal;