import api from '../api';


export const taskService = {
  /**
   * Mengambil semua daftar tugas.
   * Endpoint: GET /tasks
   * Keterangan: Hasil diurutkan berdasarkan tanggal tenggat (deadline) secara menaik (ASC).
   * @returns {Promise<any[]>} Daftar objek Task beserta ProgressLogs terkait.
   */
  findAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  /**
   * Membuat tugas baru di sistem.
   * Endpoint: POST /tasks
   * @param {Object} payload - Data sesuai CreateTaskDto (title, description, priority, deadline).
   * @returns {Promise<any>} Objek Task yang berhasil dibuat.
   */
  create: async (payload: any) => {
    const response = await api.post('/tasks', payload);
    return response.data;
  },

  /**
   * Memperbarui data tugas secara parsial (Judul, Prioritas, atau Deadline).
   * Endpoint: PATCH /tasks/:id
   * @param {string} id - UUID tugas yang akan diperbarui.
   * @param {Object} payload - Data sesuai UpdateTaskDto.
   * @returns {Promise<any>} Objek Task yang telah diperbarui.
   */
  update: async (id: string, payload: any) => {
    const response = await api.patch(`/tasks/${id}`, payload);
    return response.data;
  },

  /**
   * Memperbarui progres penyelesaian tugas.
   * Endpoint: PATCH /tasks/:id/progress
   * @param {string} id - UUID tugas.
   * @param {number} progress - Nilai progres dalam persen (0 - 100).
   * Keterangan: Backend akan mengotomatisasi perubahan status (To Do, In Progress, Completed) 
   * dan mendeteksi status keterlambatan (isLate) berdasarkan deadline.
   */
  updateProgress: async (id: string, progress: number) => {
    const response = await api.patch(`/tasks/${id}/progress`, { progress });
    return response.data;
  },

  /**
   * Menghapus tugas dari sistem.
   * Endpoint: DELETE /tasks/:id
   * @param {string} id - UUID tugas yang akan dihapus.
   * @returns {Promise<void>}
   */
  remove: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};