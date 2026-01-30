import api from '../api';

export const progressLogService = {
  /**
   * Mengambil riwayat progres berdasarkan ID Tugas.
   * Endpoint: GET /progress-logs/task/:taskId
   * Keterangan: Hasil diurutkan berdasarkan tanggal kerja terbaru (DESC).
   * @param {string} taskId - UUID dari tugas terkait.
   * @returns {Promise<any[]>} Daftar riwayat progres untuk tugas tertentu.
   */
  findByTask: async (taskId: string) => {
    const response = await api.get(`/progress-logs/task/${taskId}`);
    return response.data;
  },

  /**
   * Menambahkan catatan progres baru untuk sebuah tugas.
   * Endpoint: POST /progress-logs
   * @param {Object} payload - Data sesuai CreateProgressLogDto (date, progress, note, taskId).
   * Keterangan: Backend secara otomatis mensinkronisasi total progres ke tabel Tasks.
   * @returns {Promise<any>} Objek Progress Log yang berhasil dibuat.
   */
  create: async (payload: any) => {
    const response = await api.post('/progress-logs', payload);
    return response.data;
  },

  /**
   * Memperbarui catatan riwayat progres yang sudah ada.
   * Endpoint: PATCH /progress-logs/:id
   * @param {string} id - UUID log progres yang akan diperbarui.
   * @param {Object} payload - Data sesuai UpdateProgressLogDto.
   * @returns {Promise<any>} Objek Progress Log yang telah diperbarui.
   */
  update: async (id: string, payload: any) => {
    const response = await api.patch(`/progress-logs/${id}`, payload);
    return response.data;
  },

  /**
   * Menghapus catatan riwayat progres.
   * Endpoint: DELETE /progress-logs/:id
   * @param {string} id - UUID log progres yang akan dihapus.
   * Keterangan: Setelah dihapus, backend akan menghitung ulang total progres tugas terkait.
   * @returns {Promise<{ message: string }>} Pesan konfirmasi penghapusan.
   */
  remove: async (id: string) => {
    const response = await api.delete(`/progress-logs/${id}`);
    return response.data;
  }
};