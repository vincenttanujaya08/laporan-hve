import api from '../api';

/**
 * Service untuk mengelola data Perbaikan (Repairs).
 * Berinteraksi dengan endpoint /repairs di backend.
 */
export const repairService = {
  /**
   * Mengambil semua daftar perbaikan.
   * Endpoint: GET /repairs
   * Keterangan: Hasil diurutkan berdasarkan waktu pembuatan (createdAt) terbaru secara menurun (DESC).
   * @returns {Promise<any[]>} Daftar objek Repair.
   */
  findAll: async () => {
    const response = await api.get('/repairs'); //
    return response.data;
  },

  /**
   * Membuat data perbaikan baru.
   * Endpoint: POST /repairs
   * @param {Object} payload - Data sesuai CreateRepairDto (unitName, itemName, location, issue, entryDate).
   * @returns {Promise<any>} Objek Repair yang berhasil dibuat.
   */
  create: async (payload: any) => {
    const response = await api.post('/repairs', payload); //
    return response.data;
  },

  /**
   * Memperbarui data perbaikan berdasarkan ID.
   * Endpoint: PATCH /repairs/:id
   * @param {string} id - UUID perbaikan yang akan diperbarui.
   * @param {Object} payload - Data sesuai UpdateRepairDto (Partial dari CreateRepairDto).
   * Keterangan: Jika completionDate dikirim tanpa status, backend otomatis mengatur status ke 'Selesai'.
   * @returns {Promise<any>} Objek Repair yang telah diperbarui.
   */
  update: async (id: string, payload: any) => {
    const response = await api.patch(`/repairs/${id}`, payload); //
    return response.data;
  },

  /**
   * Menghapus data perbaikan dari sistem.
   * Endpoint: DELETE /repairs/:id
   * @param {string} id - UUID perbaikan yang akan dihapus.
   * @returns {Promise<{ message: string }>} Pesan konfirmasi penghapusan.
   */
  remove: async (id: string) => {
    const response = await api.delete(`/repairs/${id}`); //
    return response.data;
  }
};