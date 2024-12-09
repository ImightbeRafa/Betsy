import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

interface DailyStats {
  totalSales: number;
  totalAmount: number;
  eaSales: number;
  eaAmount: number;
  raSales: number;
  raAmount: number;
}

export default function DailyStats() {
  const [stats, setStats] = useState<DailyStats>({
    totalSales: 0,
    totalAmount: 0,
    eaSales: 0,
    eaAmount: 0,
    raSales: 0,
    raAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('/api/sales/list');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const text = await response.text();
        if (!text || text.startsWith('ERROR:')) {
          throw new Error(text.substring(6) || 'Invalid response from server');
        }
        
        let eaCount = 0, eaAmount = 0, raCount = 0, raAmount = 0;
        
        text.split(';').forEach(sale => {
          if (!sale.trim()) return;
          
          const [
            _orderId = '',
            _customerName = '',
            total = '0',
            _timestamp = '',
            orderType = 'EA'
          ] = sale.split('|');
          
          if (orderType === 'EA') {
            eaCount++;
            eaAmount += Number(total) || 0;
          } else if (orderType === 'RA') {
            raCount++;
            raAmount += Number(total) || 0;
          }
        });
        
        setStats({
          eaSales: eaCount,
          eaAmount: eaAmount,
          raSales: raCount,
          raAmount: raAmount,
          totalSales: eaCount + raCount,
          totalAmount: eaAmount + raAmount
        });
      } catch (error) {
        console.error('Error fetching daily stats:', error);
        setError('Error loading stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Resumen del Día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Resumen del Día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Resumen del Día</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-xl font-bold">₡{stats.totalAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {stats.totalSales} {stats.totalSales === 1 ? 'orden' : 'órdenes'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Envíos</p>
            <p className="text-xl font-bold">₡{stats.eaAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {stats.eaSales} EA
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Retiros</p>
            <p className="text-xl font-bold">₡{stats.raAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {stats.raSales} RA
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}