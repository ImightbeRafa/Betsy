import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useSalesStream } from '@/app/api/sales/useSalesStream';

interface Sale {
  orderId: string;
  status: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  product: string;
  total: number;
  timestamp: string;
  orderType: 'EA' | 'RA';
}

export function SalesDashboard() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [orderTypeFilter, setOrderTypeFilter] = useState<'ALL' | 'EA' | 'RA'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Add real-time updates
  useSalesStream({
    onData: (text) => {
      if (!text) return;
      
      const salesData = text.split(';').map((sale: string) => {
        const [
          orderId = '',
          customerName = 'Sin nombre',
          total = '0',
          timestamp = '',
          orderType = 'EA',
          phone = '',
          email = '',
          address = '',
          product = '',
          status = 'Pendiente'
        ] = sale.split('|');

        return {
          orderId: orderId || '',
          customerName: customerName || 'Sin nombre',
          total: Number(total) || 0,
          timestamp: timestamp || new Date().toISOString(),
          orderType: (orderType === 'RA' ? 'RA' : 'EA') as 'EA' | 'RA',
          status: status || 'Pendiente',
          phone: phone || '',
          email: email || '',
          address: address || '',
          product: product || ''
        };
      });
      setSales(salesData);
      setLoading(false);
    },
    onError: (errorMessage) => {
      setError(errorMessage);
      setLoading(false);
    }
  });

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/sales/list');
      
      if (!response.ok) {
        throw new Error('Failed to fetch sales');
      }
      
      const text = await response.text();
      if (!text || text.startsWith('ERROR:')) {
        throw new Error(text.substring(6) || 'Invalid response from server');
      }

      const salesData = text.split(';').map((sale: string) => {
        const [
          orderId = '',
          customerName = 'Sin nombre',
          total = '0',
          timestamp = '',
          orderType = 'EA',
          phone = '',
          email = '',
          address = '',
          product = '',
          status = 'Pendiente'
        ] = sale.split('|');

        return {
          orderId: orderId || '',
          customerName: customerName || 'Sin nombre',
          total: Number(total) || 0,
          timestamp: timestamp || new Date().toISOString(),
          orderType: (orderType === 'RA' ? 'RA' : 'EA') as 'EA' | 'RA',
          status: status || 'Pendiente',
          phone: phone || '',
          email: email || '',
          address: address || '',
          product: product || ''
        };
      });
      setSales(salesData);
    } catch (error) {
      console.error('Error fetching sales:', error);
      setError('Error loading sales data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const filteredSales = sales
    .filter(sale => {
      const matchesOrderType = orderTypeFilter === 'ALL' || sale.orderType === orderTypeFilter;
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (sale.customerName || '').toLowerCase().includes(searchLower) ||
        (sale.orderId || '').toLowerCase().includes(searchLower) ||
        (sale.phone || '').includes(searchTerm);
      return matchesOrderType && matchesSearch;
    })
    .slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Últimas Ventas</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchSales}
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <Select
            value={orderTypeFilter}
            onValueChange={(value: 'ALL' | 'EA' | 'RA') => setOrderTypeFilter(value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas</SelectItem>
              <SelectItem value="EA">Envíos</SelectItem>
              <SelectItem value="RA">Retiros</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[200px]"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Orden</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8">
                    <div className="flex justify-center">
                      <div className="animate-pulse space-y-4 w-full max-w-md">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex justify-between">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-red-500 py-8">
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredSales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No se encontraron ventas
                  </TableCell>
                </TableRow>
              ) : (
                filteredSales.map((sale) => (
                  <TableRow key={sale.orderId}>
                    <TableCell>{sale.orderId}</TableCell>
                    <TableCell>{sale.customerName}</TableCell>
                    <TableCell>₡{sale.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSale(sale)}
                      >
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles de la Orden: {selectedSale?.orderId}</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Cliente</h4>
                <p>{selectedSale.customerName}</p>
              </div>
              <div>
                <h4 className="font-semibold">Teléfono</h4>
                <p>{selectedSale.phone}</p>
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>{selectedSale.email}</p>
              </div>
              <div>
                <h4 className="font-semibold">Estado</h4>
                <p>{selectedSale.status}</p>
              </div>
              <div className="col-span-2">
                <h4 className="font-semibold">Dirección</h4>
                <p>{selectedSale.address}</p>
              </div>
              <div>
                <h4 className="font-semibold">Producto</h4>
                <p>{selectedSale.product}</p>
              </div>
              <div>
                <h4 className="font-semibold">Total</h4>
                <p className="font-bold">₡{selectedSale.total.toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}