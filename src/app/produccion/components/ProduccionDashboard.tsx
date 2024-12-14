// components/ProductionDashboard.tsx
"use client";
import React from 'react';
import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { useSalesStream } from '@/app/hooks/useSalesStream';
import { OrderList } from './OrderList';
import { OrderDetails } from './OrderDetail';
import { Sale } from '../types/sales';
import { Loader2 } from 'lucide-react';

// Memoized filter function
const filterOrders = (orders: Sale[], statusFilter: string, searchTerm: string) => {
  const searchLower = searchTerm.toLowerCase();
  return orders.filter(order => {
    if (statusFilter !== 'all' && order.status.toLowerCase() !== statusFilter) {
      return false;
    }
    return (
      order.customerName.toLowerCase().includes(searchLower) ||
      order.orderId.toLowerCase().includes(searchLower) ||
      order.product.toLowerCase().includes(searchLower)
    );
  });
};

// Memoized component for the header section
const DashboardHeader = React.memo(({ 
  loading, 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusChange 
}: {
  loading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <CardTitle className="flex items-center gap-2">
      Panel de Producción
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    </CardTitle>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Input
        placeholder="Buscar por cliente, orden o producto..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-64"
      />
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="pendiente">Pendiente</SelectItem>
          <SelectItem value="en proceso">En Proceso</SelectItem>
          <SelectItem value="completado">Completado</SelectItem>
          <SelectItem value="entregado">Entregado</SelectItem>
          <SelectItem value="Drive">Drive</SelectItem>
          <SelectItem value="Impreso">Impreso</SelectItem>
          <SelectItem value="PendienteDiseño">PendienteDiseño</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
));

DashboardHeader.displayName = 'DashboardHeader';

export function ProductionDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<Sale | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { sales: orders, isLoading: loading, error, refresh } = useSalesStream({
    pollingInterval: 30000
  });

  // Memoize filtered orders
  const filteredOrders = useMemo(() => 
    filterOrders(orders, statusFilter, searchTerm),
    [orders, statusFilter, searchTerm]
  );

  // Memoize grouped orders
  const groupedOrders = useMemo(() => ({
    EA: filteredOrders.filter(order => order.orderType === 'EA'),
    RA: filteredOrders.filter(order => order.orderType === 'RA')
  }), [filteredOrders]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/orders/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: newStatus
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update status');
      }

      refresh();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating status:', error);
      throw error instanceof Error ? error : new Error('Failed to update status');
    }
  };

  if (loading && !orders.length) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Panel de Producción</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <DashboardHeader 
            loading={loading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="EA" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="EA" className="flex items-center gap-2">
                Envíos (EA)
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm">
                  {groupedOrders.EA.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="RA" className="flex items-center gap-2">
                Retiros (RA)
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm">
                  {groupedOrders.RA.length}
                </span>
              </TabsTrigger>
            </TabsList>
            
            {['EA', 'RA'].map((type) => (
              <TabsContent key={type} value={type} className="mt-4">
                <OrderList
                  orders={groupedOrders[type as keyof typeof groupedOrders]}
                  onSelectOrder={setSelectedOrder}
                  loading={loading}
                  error={error || ''}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={(newStatus) => handleStatusUpdate(selectedOrder.orderId, newStatus)}
        />
      )}
    </div>
  );
}