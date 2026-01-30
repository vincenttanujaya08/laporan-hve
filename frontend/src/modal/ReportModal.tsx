import React, { useState } from 'react'; // Tambahkan useState
import { X, Calendar, Clock, ChevronDown } from 'lucide-react';
import { reportService } from '../services'; // Impor reportService

const modalTranslations = {
  ID: {
    title: "Buat Laporan Lapangan Baru", date: "Tanggal", location: "Lokasi",
    project: "Nama Proyek", activity: "Jenis Kegiatan", unit: "Nama Unit",
    start: "Jam Mulai", end: "Jam Selesai", desc: "Deskripsi",
    notes: "Catatan", cancel: "Batal", save: "Simpan Laporan",
    placeholders: {
      location: "Contoh: Jakarta Pusat", project: "Contoh: Instalasi Jaringan",
      activity: "Pilih Kegiatan", unit: "Pilih Unit",
      desc: "Jelaskan pekerjaan...", notes: "Kendala, material, dll..."
    },
    options: {
      survey: "Survey", install: "Instalasi",
      maint: "Maintenance", repair: "Perbaikan",
      gen: "Generator",rs: "Reach Stacker"
    }
  },
  EN: {
    title: "Create New Field Report", date: "Date", location: "Location",
    project: "Project Name", activity: "Activity Type", unit: "Unit Name",
    start: "Start Time", end: "End Time", desc: "Description",
    notes: "Notes", cancel: "Cancel", save: "Save Report",
    placeholders: {
      location: "Example: Central Jakarta", project: "Example: Network Installation", activity: "Select Activity",
      unit: "Select Unit", desc: "Describe the work...", notes: "Obstacles, materials, etc..."
    },
    options: {
      survey: "Survey", install: "Installation", maint: "Maintenance",
      repair: "Repair", gen: "Generator",rs: "Reach Stacker"
    }
  }
};

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'system';
  lang: 'ID' | 'EN';
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, theme, lang }) => {
  // 1. Inisialisasi state sesuai dengan CreateReportDto backend
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    project: '',
    activity: '',
    description: '',
    status: 'PENDING', // Nilai default sesuai persyaratan backend
    notes: '',
    equipment: '' // Opsional sesuai DTO
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const mt = modalTranslations[lang]
  const modalBg = theme === 'light' ? 'bg-white' : 'bg-[#161b26]';
  const inputBg = theme === 'light' ? 'bg-slate-50' : 'bg-[#121212]';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const labelColor = theme === 'light' ? 'text-slate-500' : 'text-white-400';
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
      // Memanggil reportService.create sesuai payload CreateReportDto
      await reportService.create(formData);
      alert(lang === 'ID' ? "Laporan berhasil disimpan!" : "Report saved successfully!");
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error("Error saving report:", error);
      alert(lang === 'ID' ? "Gagal menyimpan laporan. Pastikan semua field wajib terisi." : "Failed to save report. Ensure all required fields are filled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-black/10 backdrop-blur-sm">
      <div className={`relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${modalBg} ${textColor} ${borderColor}`}>
        
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-blue-600 opacity-40 z-10" />

        <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5 shrink-0">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight">{mt.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* 4. Tambahkan onSubmit pada form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-modal-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.date} *</label>
              <div className="relative">
                <input 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date" 
                  required
                  className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-emerald-500 transition-all`} 
                  style={{ colorScheme: theme === 'light' ? 'light' : 'dark' }} 
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.location} *</label>
              <input 
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text" 
                required
                placeholder={mt.placeholders.location} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500`} 
              />
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.project} *</label>
              <input 
                name="project"
                value={formData.project}
                onChange={handleChange}
                type="text" 
                required
                placeholder={mt.placeholders.project} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500`} 
              />
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.activity} *</label>
              <div className="relative">
                <select 
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-emerald-500 cursor-pointer`}
                >
                  <option value="" disabled>{mt.placeholders.activity}</option>
                  <option value="Survey">{mt.options.survey}</option>
                  <option value="Instalasi">{mt.options.install}</option>
                  <option value="Maintenance">{mt.options.maint}</option>
                  <option value="Perbaikan">{mt.options.repair}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Field Unit (Bisa digabung ke Activity atau Description sesuai kebutuhan logis) */}
            <div className="space-y-2 md:col-span-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.unit} *</label>
              <div className="relative">
                <select className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-emerald-500 cursor-pointer`}>
                  <option value="" disabled selected>{mt.placeholders.unit}</option>
                  <option value="gen">{mt.options.gen}</option>
                  <option value="rs">{mt.options.rs}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.start} *</label>
              <div className="relative">
                <input 
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  type="time" 
                  required
                  className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-emerald-500`} 
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.end} *</label>
              <div className="relative">
                <input 
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  type="time" 
                  required
                  className={`w-full p-3 rounded-lg border text-sm appearance-none outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-emerald-500`} 
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.desc} *</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3} 
                required
                placeholder={mt.placeholders.desc} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none`} 
              />
            </div>

            <div className="space-y-2 md:col-span-2 pb-4">
              <label className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>{mt.notes}</label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2} 
                placeholder={mt.placeholders.notes} 
                className={`w-full p-3 rounded-lg border text-sm ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none`} 
              />
            </div>
          </div>

          <div className={`p-5 md:p-6 border-t border-white/5 flex justify-end gap-3 shrink-0 ${modalBg}`}>
            <button type="button" onClick={onClose} className={`px-6 py-2 rounded-lg font-bold text-xs border ${borderColor} hover:bg-white/5 transition-colors uppercase`}>{mt.cancel}</button>
            <button 
              type="submit" 
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all uppercase ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? '...' : mt.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;