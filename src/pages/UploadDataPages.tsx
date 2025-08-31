import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import FormHeader from "../components/upload/FormHeader";
import FormSelect from "../components/upload/FormSelect";
import FormField from "../components/upload/FormField";
import InfoBox from "../components/upload/InfoBox";
import UploadButton from "../components/upload/UploadButton";
import AnalysisPopup from "../components/AnalysisPopup";
import type { Company } from "../types/database";

interface FormData {
  jenisDataLingkungan: string;
  tanggalInspeksi: string;
  perusahaanId: string;
  lokasiPerusahaan: string;
  jenisPerusahaan: string;
  statusPerusahaan: string;
  nomorPemeriksaan: string;
  catatanPemeriksaan: string;
  petugasPemeriksa: string;
  uploadedFile: File | null;
}

export default function UploadDataPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    jenisDataLingkungan: '',
    tanggalInspeksi: new Date().toISOString().split('T')[0],
    perusahaanId: '',
    lokasiPerusahaan: '',
    jenisPerusahaan: '',
    statusPerusahaan: '',
    nomorPemeriksaan: '',
    catatanPemeriksaan: '',
    petugasPemeriksa: '',
    uploadedFile: null
  });
  const [submitting, setSubmitting] = useState(false);

  // Jenis data lingkungan options
  const jenisDataLingkunganOptions = [
    'Kualitas Air Limbah',
    'Emisi Gas Buang',
    'Kebisingan',
    'Getaran',
    'Kualitas Udara Ambient',
    'Limbah B3',
    'Air Tanah',
    'Tanah Terkontaminasi'
  ];

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('nama_perusahaan');

      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyChange = (perusahaanId: string) => {
    const selectedCompany = companies.find(c => c.id.toString() === perusahaanId);
    if (selectedCompany) {
      setFormData(prev => ({
        ...prev,
        perusahaanId,
        lokasiPerusahaan: selectedCompany.lokasi_perusahaan || '',
        jenisPerusahaan: selectedCompany.jenis_industri
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Insert inspection data
      const { error: inspectionError } = await supabase
        .from('inspections')
        .insert({
          perusahaan_id: parseInt(formData.perusahaanId),
          tanggal_pemeriksaan: formData.tanggalInspeksi,
          petugas_pemeriksa: formData.petugasPemeriksa,
          catatan_pemeriksaan: formData.catatanPemeriksaan,
          status_pemeriksaan: 'Normal' // Default, bisa diubah sesuai kebutuhan
        });

      if (inspectionError) throw inspectionError;

      // Update company status if needed
      if (formData.statusPerusahaan) {
        const { error: updateError } = await supabase
          .from('companies')
          .update({ status_patuh: formData.statusPerusahaan as 'Patuh' | 'Tidak Patuh' })
          .eq('id', parseInt(formData.perusahaanId));

        if (updateError) throw updateError;
      }

      alert('Data berhasil diupload dan akan dianalisis!');
      
      // Reset form
      setFormData({
        jenisDataLingkungan: '',
        tanggalInspeksi: new Date().toISOString().split('T')[0],
        perusahaanId: '',
        lokasiPerusahaan: '',
        jenisPerusahaan: '',
        statusPerusahaan: '',
        nomorPemeriksaan: '',
        catatanPemeriksaan: '',
        petugasPemeriksa: '',
        uploadedFile: null
      });

    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Terjadi kesalahan saat mengupload data');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <FormHeader
          title="Upload Data Analisis"
          description="Upload Data Perusahaan untuk Dianalisis Menggunakan AI"
          subtitle="Form Upload Data Lingkungan"
          subtitleDesc="Isi formulir berikut untuk menginput data lingkungan yang akan dianalisis"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Jenis Data Lingkungan */}
            <FormSelect 
              label="Jenis Data Lingkungan" 
              placeholder="Pilih Jenis Data"
              value={formData.jenisDataLingkungan}
              onChange={(value) => setFormData(prev => ({ ...prev, jenisDataLingkungan: value }))}
              options={jenisDataLingkunganOptions}
            />

            {/* Tanggal Inspeksi - Auto filled and disabled */}
            <FormField 
              label="Tanggal Inspeksi" 
              type="date"
              value={formData.tanggalInspeksi}
              onChange={(value) => setFormData(prev => ({ ...prev, tanggalInspeksi: value }))}
              disabled={true}
            />

            {/* Nama Perusahaan */}
            <FormSelect 
              label="Nama Perusahaan" 
              placeholder="Pilih Perusahaan"
              value={formData.perusahaanId}
              onChange={handleCompanyChange}
              options={companies.map(c => ({ value: c.id.toString(), label: c.nama_perusahaan }))}
            />

            {/* Lokasi Perusahaan - Auto filled */}
            <FormField 
              label="Lokasi Perusahaan" 
              placeholder="Lokasi akan terisi otomatis"
              value={formData.lokasiPerusahaan}
              disabled={true}
            />
          </div>

          {/* Jenis Perusahaan - Auto filled */}
          <FormField 
            label="Jenis Perusahaan" 
            placeholder="Jenis akan terisi otomatis sesuai perusahaan"
            value={formData.jenisPerusahaan}
            disabled={true}
          />

          {/* Status Perusahaan Radio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Status Perusahaan
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  value="Patuh"
                  checked={formData.statusPerusahaan === 'Patuh'}
                  onChange={(e) => setFormData(prev => ({ ...prev, statusPerusahaan: e.target.value }))}
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700">Patuh</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  value="Tidak Patuh"
                  checked={formData.statusPerusahaan === 'Tidak Patuh'}
                  onChange={(e) => setFormData(prev => ({ ...prev, statusPerusahaan: e.target.value }))}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700">Tidak Patuh</span>
              </label>
            </div>
          </div>

          <FormField 
            label="Nomor Pemeriksaan Lingkungan" 
            placeholder="Masukkan Nomor Izin dari Dinas Lingkungan"
            value={formData.nomorPemeriksaan}
            onChange={(value) => setFormData(prev => ({ ...prev, nomorPemeriksaan: value }))}
          />

          <FormField 
            label="Catatan Pemeriksaan" 
            placeholder="Masukkan Catatan Hasil Pemeriksaan"
            value={formData.catatanPemeriksaan}
            onChange={(value) => setFormData(prev => ({ ...prev, catatanPemeriksaan: value }))}
            multiline={true}
          />

          <FormField 
            label="Petugas Pemeriksa" 
            placeholder="Masukkan Nama Petugas dari Dinas Lingkungan"
            value={formData.petugasPemeriksa}
            onChange={(value) => setFormData(prev => ({ ...prev, petugasPemeriksa: value }))}
          />

          {/* Upload File */}
          <div>
            <label className="text-sm font-medium text-gray-700">Upload File Data</label>
            <input 
              type="file" 
              onChange={(e) => setFormData(prev => ({ ...prev, uploadedFile: e.target.files?.[0] || null }))}
              className="mt-2 block w-full text-sm border border-gray-300 rounded-lg cursor-pointer p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              accept=".csv,.xlsx,.pdf"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format yang didukung: CSV, Excel (.xlsx), PDF
            </p>
          </div>

          {/* Info Box */}
          <InfoBox />

          {/* Submit Button */}
          <UploadButton 
            loading={submitting}
            disabled={!formData.perusahaanId || !formData.petugasPemeriksa || submitting}
          />
        </form>

        {/* Analysis Popup */}
        <AnalysisPopup isOpen={submitting} />
      </div>
    </div>
  );
}