import React, { useState } from 'react'; 
import { X, Calendar, Check, ChevronDown } from 'lucide-react';
import { repairService } from '../services'; 

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
    statusOptions: [
      { label: "Barang Diterima", value: "Barang Diterima" },
      { label: "Sedang Dikerjakan", value: "Sedang Dikerjakan" },
      { label: "Selesai", value: "Selesai" }
    ]
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
    statusOptions: [
      { label: "Item Received", value: "Barang Diterima" },
      { label: "In Progress", value: "Sedang Dikerjakan" },
      { label: "Completed", value: "Selesai" }
    ]
  }
};

interface RepairInputProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'system';
  lang: 'ID' | 'EN';
}

const RepairInputModal: React.FC<RepairInputProps> = ({ isOpen, onClose, theme, lang }) => {
  // 1. Inisialisasi state sesuai dengan CreateRepairDto backend
  const [formData, setFormData] = useState({
    itemName: '',
    unitName: '',
    location: '',
    issue: '',
    status: 'Barang Diterima', // Default value sesuai Enum backend
    entryDate: ''
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const t = translations[lang];
  const modalBg = theme === 'light' ? 'bg-white' : 'bg-[#1e1e1e]';
  const inputBg = theme === 'light' ? 'bg-slate-50' : 'bg-[#121212]';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const labelColor = theme === 'light' ? 'text-slate-500' : 'text-slate-100';
  const borderColor = theme === 'light' ? 'border-slate-200' : 'border-white/5';

  // 2. Handler untuk perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Handler untuk pengiriman data ke backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await repairService.create(formData);
      alert(lang === 'ID' ? "Data perbaikan berhasil disimpan!" : "Repair data saved successfully!");
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error("Error saving repair:", error);
      alert(lang === 'ID' ? "Gagal menyimpan data perbaikan." : "Failed to save repair data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm">
      <div className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${modalBg} ${textColor} ${borderColor}`}>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-40 z-10" />

        <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5 shrink-0">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight">{t.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* 4. Bungkus dalam form dan tambahkan onSubmit */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-modal-scroll">
          <div className="space-y-6">
            
            {/* Item Perbaikan (itemName) */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.repairItem} *</label>
              <input 
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                type="text" 
                required
                placeholder={t.placeholders.repairItem}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`} />
            </div>

            {/* Unit Alat (unitName) */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.unit} *</label>
              <input 
                name="unitName"
                value={formData.unitName}
                onChange={handleChange}
                type="text" 
                required
                placeholder={t.placeholders.unit}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`} />
            </div>

            {/* Lokasi Operasi */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.location} *</label>
              <input 
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text" 
                required
                placeholder={t.placeholders.location}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all`} />
            </div>

            {/* Deskripsi Kerusakan (issue) */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.damageDesc} *</label>
              <textarea 
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows={4} 
                required
                placeholder={t.placeholders.damageDesc} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none`} />
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold">
                <Calendar size={18} />
                <h3 className="text-xs uppercase tracking-widest">{t.statusDate}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status Perbaikan */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.status}</label>
                  <div className="relative">
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-indigo-500 cursor-pointer`}
                    >
                      {t.statusOptions.map((opt, i) => (
                        <option key={i} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                  </div>
                </div>

                {/* Tanggal Masuk (entryDate) */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{t.receivedDate} *</label>
                  <div className="relative">
                    <input 
                      name="entryDate"
                      value={formData.entryDate}
                      onChange={handleChange}
                      type="date" 
                      required
                      className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-indigo-500`}
                      style={{ colorScheme: theme === 'light' ? 'light' : 'dark' }}/>
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                  </div>
                  <p className="text-[10px] text-slate-500 italic mt-1">{t.placeholders.dateSub}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-5 md:p-6 border-t border-white/5 flex gap-4 shrink-0 ${modalBg}`}>
            <button 
              type="submit" 
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20 transition-all uppercase ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Check size={18} /> {loading ? '...' : t.save}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className={`px-8 py-3 rounded-xl font-bold text-sm border ${borderColor} ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200' : 'bg-zinc-800/50 hover:bg-zinc-800'} transition-colors uppercase`}>
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RepairInputModal;