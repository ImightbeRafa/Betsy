import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useSalesStream } from '@/app/hooks/useSalesStream';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface DailyStats {
  totalSales: number;
  totalAmount: number;
  eaSales: number;
  eaAmount: number;
  raSales: number;
  raAmount: number;
}

function isToday(dateString: string): boolean {
  const saleDate = new Date(dateString);
  const today = new Date();
  
  return saleDate.getDate() === today.getDate() &&
         saleDate.getMonth() === today.getMonth() &&
         saleDate.getFullYear() === today.getFullYear();
}

export default function DailyStats() {
  const { sales, isLoading, error } = useSalesStream();

  // Calculate daily stats from filtered sales
  const stats = React.useMemo(() => {
    const initialStats: DailyStats = {
      totalSales: 0,
      totalAmount: 0,
      eaSales: 0,
      eaAmount: 0,
      raSales: 0,
      raAmount: 0,
    };

    if (!sales?.length) return initialStats;

    return sales.reduce((acc, sale) => {
      // Skip if not today's sale
      if (!isToday(sale.timestamp)) return acc;

      const amount = Number(sale.total) || 0;

      if (sale.orderType === 'EA') {
        acc.eaSales++;
        acc.eaAmount += amount;
      } else if (sale.orderType === 'RA') {
        acc.raSales++;
        acc.raAmount += amount;
      }

      acc.totalSales++;
      acc.totalAmount += amount;

      return acc;
    }, initialStats);
  }, [sales]);

  if (isLoading) {
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
        <CardTitle className="text-lg font-semibold">
          Resumen del Día
          <span className="ml-2 text-sm text-muted-foreground">
            {new Date().toLocaleDateString('es-CR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Total del Día
              {stats.totalAmount > 0 && <ArrowUpIcon className="w-4 h-4 text-green-500" />}
            </p>
            <p className="text-2xl font-bold">₡{stats.totalAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {stats.totalSales} {stats.totalSales === 1 ? 'orden' : 'órdenes'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Envíos (EA)
              {stats.eaSales > 0 && <ArrowUpIcon className="w-4 h-4 text-green-500" />}
            </p>
            <p className="text-2xl font-bold">₡{stats.eaAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {stats.eaSales} {stats.eaSales === 1 ? 'envío' : 'envíos'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Retiros (RA)
              {stats.raSales > 0 && <ArrowUpIcon className="w-4 h-4 text-green-500" />}
            </p>
            <p className="text-2xl font-bold">₡{stats.raAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {stats.raSales} {stats.raSales === 1 ? 'retiro' : 'retiros'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}