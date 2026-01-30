import React from 'react';
import { X, Check, Package } from 'lucide-react';

// --- MODAL TRANSLATIONS ---
const translations = {
  ID: {
    title: "Pesan Suku Cadang Baru",
    partName: "Nama Suku Cadang",
    desc: "Deskripsi",
    quantity: "Jumlah",
    unit: "Satuan",
    save: "Simpan",
    cancel: "Batal",
    placeholders: {
      partName: "Contoh: Bearing SKF 6205",
      desc: "Detail spesifikasi atau catatan tambahan",
      unit: "pcs, set, unit, dll"
    }
  },
  EN: {
    title: "Order New Spare Part",
    partName: "Spare Part Name",
    desc: "Description",
    quantity: "Quantity",
    unit: "Unit",
    save: "Save",
    cancel: "Cancel",
    placeholders: {
      partName: "Example: Bearing SKF 6205",
      desc: "Detailed specifications or additional notes",
      unit: "pcs, set, unit, etc"
    }
  }
};

interface OrderSparepartModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'system';
  lang: 'ID' | 'EN';
}

const OrderSparepartModal: React.FC<OrderSparepartModalProps> = ({ isOpen, onClose, theme, lang }) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const modalBg = theme === 'light' ? 'bg-white' : 'bg-[#1e1e1e]';
  const inputBg = theme === 'light' ? 'bg-slate-50' : 'bg-[#121212]';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const labelColor = theme === 'light' ? 'text-slate-500' : 'text-slate-100';
  const borderColor = theme === 'light' ? 'border-slate-200' : 'border-white/5';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm">
      
      <div className={`relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${modalBg} ${textColor} ${borderColor}`}>
        
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-purple-600 opacity-40 z-10" />

        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5 shrink-0">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight">{t.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-modal-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* Nama Suku Cadang */}
            <div className="space-y-2 md:col-span-2">
              <label className={`text-sm font-bold uppercase tracking-widest ${labelColor}`}>{t.partName} *</label>
              <input 
                type="text" 
                placeholder={t.placeholders.partName}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-fuchsia-500 transition-all`} />
            </div>

            {/* Deskripsi */}
            <div className="space-y-2 md:col-span-2">
              <label className={`text-sm font-bold uppercase tracking-widest ${labelColor}`}>{t.desc}</label>
              <textarea 
                rows={4} 
                placeholder={t.placeholders.desc} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-fuchsia-500 resize-none`}/>
            </div>

            {/* Jumlah */}
            <div className="space-y-2">
              <label className={`text-sm font-bold uppercase tracking-widest ${labelColor}`}>{t.quantity} *</label>
              <input 
                type="number" 
                defaultValue={0}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-fuchsia-500`}/>
            </div>

            {/* Satuan */}
            <div className="space-y-2">
              <label className={`text-sm font-bold uppercase tracking-widest ${labelColor}`}>{t.unit}</label>
              <input 
                type="text" 
                placeholder={t.placeholders.unit}
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-fuchsia-500`}/>
            </div>
          </div>
        </form>

        <div className={`p-5 md:p-6 border-t border-white/5 flex gap-4 shrink-0 ${modalBg}`}>
          <button type="submit" 
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-900/20 transition-all uppercase">
            <Check size={18} /> {t.save}
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

export default OrderSparepartModal;