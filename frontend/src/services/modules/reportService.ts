import api from '../api';

export const reportService = {
  /**
   * Mengambil semua daftar laporan (Memanggil GET /reports)
   * Backend mengembalikan data yang diurutkan berdasarkan tanggal terbaru (DESC).
   */
  findAll: async () => {
    const response = await api.get('/reports');
    return response.data;
  },

  /**
   * Membuat laporan baru (Memanggil POST /reports)
   * Payload harus sesuai dengan CreateReportDto:
   * - date (string ISO), startTime, endTime, location, project, 
   * - activity, description, status (PENDING/APPROVED/REJECTED)
   */
  create: async (payload: any) => {
    const response = await api.post('/reports', payload);
    return response.data;
  },

  /**
   * Memperbarui laporan (Memanggil PATCH /reports/:id)
   * Menggunakan UpdateReportDto (Partial dari CreateReportDto)
   */
  update: async (id: string, payload: any) => {
    const response = await api.patch(`/reports/${id}`, payload);
    return response.data;
  },

  /**
   * Menghapus laporan (Memanggil DELETE /reports/:id)
   */
  remove: async (id: string) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  }
};