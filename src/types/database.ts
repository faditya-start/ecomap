export interface Company {
  id: number;
  nama_perusahaan: string;
  nomor_izin_lingkungan: string;
  jenis_industri: string;
  alamat?: string;
  email?: string;
  tanggal_pendaftaran: string;
  status_persetujuan: "Telah Disetujui" | "Belum Disetujui";
  status_patuh: "Patuh" | "Tidak Patuh";
  lokasi_perusahaan?: string;
}

export interface Inspection {
  id: number;
  perusahaan_id: number;
  tanggal_pemeriksaan: string;
  petugas_pemeriksa: string;
  catatan_pemeriksaan?: string | null; // bisa null
  status_pemeriksaan: "Normal" | "Abnormal";
}

export interface EnvironmentData {
  id: number;
  parameter: string;
  value: number;
  unit: string | null;
  status: "normal" | "warning" | "danger";
}