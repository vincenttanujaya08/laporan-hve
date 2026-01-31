import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  theme: 'light' | 'dark' | 'system';
  lang: 'ID' | 'EN';
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  theme,
  lang
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const modalBg = isLight ? 'bg-white' : 'bg-[#1e1e1e]';
  const textColor = isLight ? 'text-slate-900' : 'text-slate-100';
  const borderColor = isLight ? 'border-slate-200' : 'border-white/10';

  const t = {
    ID: {
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus laporan ini? Tindakan ini tidak dapat dibatalkan.`,
      cancel: "Batal",
      confirm: "Hapus",
    },
    EN: {
      title: "Delete Confirmation",
      message: `Are you sure you want to delete this report? This action cannot be undone.`,
      cancel: "Cancel",
      confirm: "Delete",
    }
  }[lang];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border ${modalBg} ${textColor} ${borderColor}`}>
        
        <div className="p-6 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:h-10 sm:w-10">
            <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div>
             <h3 className="text-lg leading-6 font-bold uppercase tracking-tight mb-2">
              {t.title}
            </h3>
            <div className="mt-2">
              <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {t.message}
                {itemName && <span className="block mt-2 font-bold italic">"{itemName}"</span>}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-4 border-t ${borderColor} flex gap-3 justify-end ${isLight ? 'bg-slate-50' : 'bg-[#252525]'}`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-bold text-xs border ${borderColor} ${isLight ? 'hover:bg-white' : 'hover:bg-white/5'} transition-colors uppercase`}
          >
            {t.cancel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-bold text-xs bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all uppercase"
          >
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;