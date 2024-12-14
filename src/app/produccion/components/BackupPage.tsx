// components/BackupPage.tsx
import SalesBackup from '@/app/backup/DataBackup';

export default function BackupPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm mx-4 my-8 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Data Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Backup and manage your sales data
          </p>
        </div>
        <SalesBackup />
      </div>
    </div>
  );
}