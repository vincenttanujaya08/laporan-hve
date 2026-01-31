import React, { useState } from 'react';
import { Search, FileSpreadsheet, FileText, Plus, ChevronDown, Calendar, MapPin, Clock, Edit2, Trash2 } from 'lucide-react';
import backgroundImage from '../assets/background.webp'; 
import ReportModal from '../modal/ReportModal'; 
import DeleteConfirmationModal from '../modal/DeleteConfirmationModal'; 

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ReportData {
  id: string;
  date: string;
  displayDate: string; 
  location: string;
  project: string;
  activity: string;
  unit: string;
  startTime: string;
  endTime: string;
  duration: string;
  description: string;
  notes?: string;
}

const DUMMY_REPORTS: ReportData[] = [
  {
    id: 'R001',
    date: '2026-01-08',
    displayDate: 'Kamis, 8 Januari 2026',
    location: 'Depo Langon',
    project: 'Ambil data timbangan',
    activity: 'Survey',
    unit: 'K18',
    startTime: '09:00',
    endTime: '11:53',
    duration: '2.9 jam',
    description: 'Uji coba timbangan dengan ADS1115',
    notes: 'Nilai angle tidak mau 0 (Done)'
  },
  {
    id: 'R002',
    date: '2026-01-06',
    displayDate: 'Selasa, 6 Januari 2026',
    location: 'Depo 4',
    project: 'Repair Keypad BBM',
    activity: 'Maintenance',
    unit: 'Project BBM',
    startTime: '13:00',
    endTime: '13:30',
    duration: '0.5 jam',
    description: 'Buka dan bersihkan keypad',
  }
];

interface ReportPageProps {
    theme: 'light' | 'dark' | 'system';
    lang: 'ID' | 'EN';
}

const ReportPage: React.FC<ReportPageProps> = ({ theme, lang }) => {
  const [reports, setReports] = useState<ReportData[]>(DUMMY_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  const handleCreateNew = () => {
      setSelectedReport(null);
      setIsEditModalOpen(true);
  };

  const exportToExcel = () => {
    const dataToExport = reports.map(r => ({
      ID: r.id,
      Tanggal: r.displayDate,
      Proyek: r.project,
      Kegiatan: r.activity,
      Unit: r.unit,
      Lokasi: r.location,
      Waktu: `${r.startTime} - ${r.endTime}`,
      Durasi: r.duration,
      Deskripsi: r.description,
      Catatan: r.notes || '-'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Lapangan");
    XLSX.writeFile(workbook, `Laporan_Lapangan_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Tanggal", "Proyek", "Kegiatan", "Unit", "Waktu"];
    const tableRows = reports.map(r => [
      r.id,
      r.displayDate,
      r.project,
      r.activity,
      r.unit,
      `${r.startTime} - ${r.endTime}`
    ]);

    doc.text("Laporan Lapangan HVE Electrical SPIL", 14, 15);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save(`Laporan_Lapangan_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleEditClick = (report: ReportData) => {
      setSelectedReport(report);
      setIsEditModalOpen(true);
  };

  const handleDeleteClick = (report: ReportData) => {
      setSelectedReport(report);
      setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
      if (selectedReport) {
          setReports(reports.filter(r => r.id !== selectedReport.id));
          setIsDeleteModalOpen(false);
          setSelectedReport(null);
      }
  };

  const isLight = theme === 'light';
  const bgColor = isLight ? 'bg-slate-50' : 'bg-[#0b0f1a]'; 
  const cardBg = isLight ? 'bg-white/80' : 'bg-[#1e2433]/80';
  const textColor = isLight ? 'text-slate-900' : 'text-slate-100';
  const labelColor = isLight ? 'text-slate-500' : 'text-slate-400';
  const borderColor = isLight ? 'border-slate-200' : 'border-white/5';
  const inputBg = isLight ? 'bg-white/90' : 'bg-[#161b26]/90';

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 transition-colors duration-300 relative ${bgColor} ${textColor}`}>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src={backgroundImage} alt="Port" 
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLight ? 'opacity-30' : 'opacity-50 brightness-90'}`} />
        <div className={`absolute inset-0 ${isLight ? 'bg-white/1' : 'bg-gradient-to-b from-[#0b0f1a]/20 via-[#0b0f1a]/40 to-[#0b0f1a]/70'}`} />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
        {/* Header Section */}
          <div className={`p-4 rounded-2xl ${cardBg} backdrop-blur-md shadow-lg border ${borderColor}`}>
              <div className="relative mb-4">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${labelColor}`} size={20} />
                  <input 
                      type="text" placeholder={lang === 'ID' ? "Cari proyek, lokasi, kegiatan, atau nama unit..." : "Search project, location, activity, or unit name..."}
                      value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm outline-none ${borderColor} ${inputBg} focus:ring-1 focus:ring-blue-500 transition-all`}/>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                      <button onClick={exportToExcel}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#107c41] hover:bg-[#0c5e31] text-white font-bold text-xs uppercase transition-colors">
                          <FileSpreadsheet size={18} /> Excel
                      </button>
                      <button onClick={exportToPDF}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold text-xs uppercase transition-colors">
                          <FileText size={18} /> PDF
                      </button>
                      <button 
                          onClick={handleCreateNew}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase shadow-lg shadow-blue-500/20 transition-all ml-auto md:ml-0">
                          <Plus size={18} strokeWidth={3} /> {lang === 'ID' ? "Laporan Baru" : "New Report"}
                      </button>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <span className={`text-xs font-bold uppercase ${labelColor}`}>{lang === 'ID' ? "Urutkan:" : "Sort by:"}</span>
                      <div className="relative">
                          <select className={`appearance-none pl-4 pr-10 py-2 rounded-lg border text-xs font-bold uppercase outline-none ${borderColor} ${inputBg} cursor-pointer focus:ring-1 focus:ring-blue-500`}>
                              <option>{lang === 'ID' ? "Tanggal Terbaru" : "Newest Date"}</option>
                              <option>{lang === 'ID' ? "Tanggal Terlama" : "Oldest Date"}</option>
                          </select>
                          <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${labelColor}`} size={16} />
                      </div>
                  </div>

              </div>
          </div>

        {/* Report Section */}
          <div className="space-y-4">
              {reports.map((report) => (
                  <div key={report.id} className={`relative p-6 rounded-2xl shadow-lg border ${cardBg} backdrop-blur-md ${borderColor} group transition-all hover:border-blue-500/30 overflow-hidden`}>
                      <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-500"></div>
                      <div className="pl-2 space-y-4">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div className="flex flex-wrap items-center gap-3">
                                  <h3 className="text-lg font-bold uppercase tracking-tight">{report.project}</h3>
                                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">{report.activity}</span>
                                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">{report.unit}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => handleEditClick(report)} className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors">
                                      <Edit2 size={18} />
                                  </button>
                                  <button onClick={() => handleDeleteClick(report)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
                                      <Trash2 size={18} />
                                  </button>
                              </div>
                          </div>

                          <div className={`flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-bold uppercase tracking-widest ${labelColor}`}>
                              <div className="flex items-center gap-2">
                                  <Calendar size={14} className="text-blue-500" /> {report.displayDate}
                              </div>
                              <div className="flex items-center gap-2">
                                  <MapPin size={14} className="text-emerald-500" /> {report.location}
                              </div>
                              <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-orange-500" /> {report.startTime} - {report.endTime} <span className={textColor}>({report.duration})</span>
                              </div>
                          </div>

                          <div className={`space-y-2 pt-4 border-t ${borderColor}`}>
                              <div>
                                  <span className={`font-bold ${textColor}`}>{lang === 'ID' ? "Deskripsi:" : "Description:"} </span>
                                  <span className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{report.description}</span>
                              </div>
                             {report.notes && (
                                  <div>
                                      <span className={`font-bold ${textColor}`}>{lang === 'ID' ? "Catatan:" : "Notes:"} </span>
                                      <span className={`text-sm italic ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{report.notes}</span>
                                  </div>
                             )}
                          </div>

                      </div>
                  </div>
              ))}
          </div>
        </div>
      </div>

      <ReportModal
          isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}
          theme={theme} lang={lang} initialData={selectedReport}/>

      <DeleteConfirmationModal
          isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete} itemName={selectedReport?.project}
          theme={theme} lang={lang}/>
    </div>
  );
};

export default ReportPage;