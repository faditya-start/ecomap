import FormHeader from "../components/upload/FormHeader";
import FormSelect from "../components/upload/FormSelect";
import FormField from "../components/upload/FormField";
import InfoBox from "../components/upload/InfoBox";
import UploadButton from "../components/upload/UploadButton";

export default function UploadDataPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
        
        <div className=" space-y-8">
            {/* Header */}
            <FormHeader
            title="Upload Data Analisis"
            description="Upload Data Perusahaan untuk Dianalisis Menggunakan AI"
            subtitle="Form Upload Data Lingkungan"
            subtitleDesc="Isi formulir berikut untuk menginput data lingkungan yang akan dianalisis"
            />

            {/* Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <FormSelect label="Jenis Data Lingkungan" placeholder="Pilih Jenis Data" />
                <FormField label="Tanggal Inspeksi" type="date" />
                <FormField label="Nama Perusahaan" placeholder="List Perusahaan" />
                <FormField label="Lokasi Perusahaan" placeholder="Pilih Peta" />
            </div>

            <FormField label="Jenis Perusahaan" placeholder="List Perusahaan" />

            {/* Radio */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                Status Perusahaan
                </label>
                <div className="flex gap-6">
                <label className="flex items-center gap-2">
                    <input type="radio" name="status" value="patuh" />
                    <span>Patuh</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="status" value="tidak" />
                    <span>Tidak Patuh</span>
                </label>
                </div>
            </div>

            <FormField label="Nomor Pemeriksaan Lingkungan" placeholder="Masukkan Nomor Izin dari Dinas Lingkungan" />
            <FormField label="Catatan Pemeriksaan" placeholder="Masukkan Catatan Hasil Pemeriksaan" />
            <FormField label="Petugas Pemeriksa" placeholder="Masukkan Nama Petugas dari Dinas Lingkungan" />

            {/* Upload */}
            <div>
                <label className="text-sm font-medium text-gray-700">Upload File Data</label>
                <input type="file" className="mt-2 block w-full text-sm border border-gray-300 rounded-lg cursor-pointer p-2" />
            </div>

            {/* Info */}
            <InfoBox />

            {/* Button */}
            <UploadButton />
            </div>
        </div>
    </div>
  );
}
