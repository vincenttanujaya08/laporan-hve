import api from '../api';

export const sparepartService = {
  /**
   * Mengambil semua daftar sparepart (Memanggil GET /spareparts)
   * Data diurutkan berdasarkan nama secara alfabetis (A-Z).
   */
  findAll: async () => {
    const response = await api.get('/spareparts');
    return response.data;
  },

  /**
   * Menambahkan sparepart baru (Memanggil POST /spareparts)
   * Membutuhkan: name, quantity (min 1), unit.
   * Opsional: description, status, orderDate, arrivalDate.
   */
  create: async (payload: any) => {
    const response = await api.post('/spareparts', payload);
    return response.data;
  },

  /**
   * Memperbarui data sparepart (Memanggil PATCH /spareparts/:id)
   * Digunakan untuk mengubah detail seperti nama, status, atau tanggal.
   */
  update: async (id: string, payload: any) => {
    const response = await api.patch(`/spareparts/${id}`, payload);
    return response.data;
  },

  /**
   * Menyesuaikan stok sparepart (Memanggil PATCH /spareparts/:id/stock)
   * Menggunakan UpdateStockDto yang menerima properti 'qty'.
   * Nilai qty bisa positif (tambah) atau negatif (kurang).
   */
  adjustStock: async (id: string, qty: number) => {
    const response = await api.patch(`/spareparts/${id}/stock`, { qty });
    return response.data;
  },

  /**
   * Menghapus data sparepart (Memanggil DELETE /spareparts/:id).
   */
  remove: async (id: string) => {
    const response = await api.delete(`/spareparts/${id}`);
    return response.data;
  }
};