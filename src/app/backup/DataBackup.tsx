"use client"
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import type { SaleData } from '@/app/api/sales/stream/types';

interface BackupInfo {
  date: string;
  filename: string;
  size: number;
}

const BACKUP_PREFIX = 'sales_backup_';
const MAX_BACKUPS = 5;

const SalesBackup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [backups, setBackups] = useState<BackupInfo[]>([]);

  useEffect(() => {
    const savedBackups = localStorage.getItem('salesBackups');
    if (savedBackups) {
      setBackups(JSON.parse(savedBackups));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('salesBackups', JSON.stringify(backups));
  }, [backups]);

  const createBackup = async () => {
    setIsLoading(true);
    setError(null);

    // Generate date outside try block
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const filename = `${BACKUP_PREFIX}${formattedDate}.xlsx`;

    try {
      // Fetch sales data
      const response = await fetch('/api/sales/stream');
      if (!response.ok) throw new Error('Failed to fetch sales data');
      const data = await response.json();

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid data format');
      }

      // Prepare data for Excel
      const workbook = XLSX.utils.book_new();
      
      // Split data into EA and RA sheets
      const eaSales = data.data.filter((sale: SaleData) => sale.orderType === 'EA');
      const raSales = data.data.filter((sale: SaleData) => sale.orderType === 'RA');

      // Create EA sheet
      if (eaSales.length > 0) {
        const eaWorksheet = XLSX.utils.json_to_sheet(eaSales);
        XLSX.utils.book_append_sheet(workbook, eaWorksheet, 'EA Orders');
      }

      // Create RA sheet
      if (raSales.length > 0) {
        const raWorksheet = XLSX.utils.json_to_sheet(raSales);
        XLSX.utils.book_append_sheet(workbook, raWorksheet, 'RA Orders');
      }

      // Convert to binary string
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
      // Create blob and download
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);

      // Update backups list
      const newBackup = {
        date: formattedDate,
        filename,
        size: blob.size
      };

      setBackups(prev => {
        const updated = [newBackup, ...prev].slice(0, MAX_BACKUPS);
        return updated;
      });

      setLastBackup(formattedDate);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create backup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Backup Status</h3>
              <p className="text-sm text-gray-500">
                {lastBackup 
                  ? `Last backup: ${format(new Date(lastBackup), 'PPP')}`
                  : 'No backups created yet'}
              </p>
            </div>
            <Button
              onClick={createBackup}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isLoading ? 'Creating...' : 'Backup Now'}
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Retention Policy</h3>
              <p className="text-sm text-gray-500">
                Keeping last {MAX_BACKUPS} backups
              </p>
            </div>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Backup History */}
      <div className="bg-white rounded-lg border">
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-medium text-gray-900">Backup History</h3>
        </div>
        <div className="divide-y">
          {backups.map((backup) => (
            <div
              key={backup.date}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {backup.filename}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(backup.date), 'PPP')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">
                  {(backup.size / 1024).toFixed(2)} KB
                </span>
                <Download 
                  className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" 
                />
              </div>
            </div>
          ))}
          {backups.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No backups available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesBackup;